import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private users:Repository<User>){
        
    }

    create(newUser:createUserDto){
        let newu=this.users.create(newUser)
        this.users.save(newu)
    }
 
    update(id:number,upuser:updateUserDto){
        this.users.update(id,upuser)
    }

}
