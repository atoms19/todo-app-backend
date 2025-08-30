import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}


    @Post('register')
    register(@Body() data :registerDto){
        return this.authService.register(data)
    }

    @Post('login')
    login(@Body() data:loginDto){
        return this.authService.login(data)
    }

    @UseGuards(AuthGuard)
    @Get('whoami')
    myprofile(){
        return 'authenticated boss sends his regards'
    }

}
