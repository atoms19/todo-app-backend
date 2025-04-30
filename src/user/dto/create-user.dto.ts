import { IsEmail, isNotEmpty, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class createUserDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    // @IsStrongPassword()
    password:string



}