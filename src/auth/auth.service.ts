import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import {compare, hash} from 'bcryptjs'
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService,
        private readonly jwtService:JwtService
    ){}

   async register(data:registerDto){
        let user=await this.userService.findByEmail(data.email)
        if(user){
            throw new InternalServerErrorException("user already exists")
        }

        let pas=await hash(data.password,10)
        
         this.userService.create({
            email:data.email,
            name:data.name,
            password:pas
        })

        let usercreated=await this.userService.findByEmail(data.email)

        const token= this.jwtService.sign({
            sub:usercreated?.id
        })
        return {access_token:token}
    }

    async login(data :loginDto){
        let user=await this.userService.findByEmail(data.email)
        if(!user){
            throw new UnauthorizedException("Invalid credentials")
        }
        let isValid=await compare(data.password,user.password)
        if(!isValid){throw new UnauthorizedException('Invalid credentails')}
        
         const token= this.jwtService.sign({
            sub:user.id
        })
        return {access_token:token}
    }
}
