import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { authConstants } from './auth.constants';
import { AuthGuard } from './auth.guard';
@Module({
  controllers: [AuthController],
  imports:[UserModule,JwtModule.register({
    secret:authConstants.jwtSecret,
    signOptions:{
      expiresIn:'60s'
    }
  })
  
],
  providers: [AuthService],
})
export class AuthModule {}
