import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty()
    @IsString()
    @MinLength(4, { message: 'Password should be longer than 4 characters'})
    @MaxLength(20, { message: 'Password should be shorter than 20 characters'})
    password: string;
}