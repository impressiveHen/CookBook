import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4, { message: 'Password should be longer than 4 characters'})
    @MaxLength(20, { message: 'Password should be shorter than 20 characters'})
    password: string;
}