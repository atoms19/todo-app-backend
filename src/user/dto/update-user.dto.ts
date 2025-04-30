import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class updateUserDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    password:string
}