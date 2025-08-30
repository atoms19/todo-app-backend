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

    findAll(){
        return this.users.find()
    }

    create(newUser:createUserDto){
        let newu=this.users.create(newUser)
        this.users.save(newu)
        return newu
    }
 
    update(id:number,upuser:updateUserDto){
        this.users.update(id,upuser)
    }

    findByEmail(email:string){
        return this.users.findOneBy({email})
    }

}
