import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/interfaces/user.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CONFLICT_ERROR_CODE, USER_MODEL_PROVIDER } from 'src/constants';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_MODEL_PROVIDER)
        private userModel: Model<User>,

        private jwtService: JwtService
    ) {}

    async signUp(authCredentialSDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialSDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({username, password: hashedPassword});

        try {
            await user.save();
        } catch (error) {
            if (error.code === CONFLICT_ERROR_CODE) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    async signIn(user: User) {
        const payload = { username: user.username, id: user._id };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            return null;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            return user;
        }

        return null;
    }
}
