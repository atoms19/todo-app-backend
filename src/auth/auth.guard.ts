import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { authConstants } from './auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService:JwtService){}
  
  async canActivate(context:ExecutionContext)
  
  
  {
    let req=context.switchToHttp().getRequest()
    let [type,tokn]=req.headers.authorization?.split(' ')??[]
    let token=type=="Bearer"?tokn : undefined
    if(!token){
      throw new UnauthorizedException()
    }
    try{
      let payload=await this.jwtService.verifyAsync(token,{
        secret:authConstants.jwtSecret,
        ignoreExpiration:true
      })
      req['userId']=payload.sub

    }catch{
      throw new UnauthorizedException()
    }

    return true
    
  }
}
