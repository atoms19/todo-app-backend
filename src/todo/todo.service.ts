import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { createTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private todos:Repository<Todo>){}

    create(dto:createTodoDto,id:number){
       const todo=this.todos.create({...dto,user:{id}})
       return this.todos.save(todo)
    }
    findAll(){
        return this.todos.find()
    }
    findAllForUser(id:number){
      console.log('id is',id)
      return this.todos.find({ where:{user:{id}}})
    }
    findOne(id:number,userId:number){
        return this.todos.find({where:{
          id,
          user:{id:userId}
        }})
    }

   async update(id: number, dto: UpdateTodoDto,userId:number) {
   const todo = await this.findOne(id,userId)

  if (!todo) throw new NotFoundException('Todo not found');
  
  console.log(todo[0],dto)
  Object.assign(todo[0], dto);
  return this.todos.save(todo[0]);
  }
    async remove(id:number,userId:number){
         const todo = await this.findOne(id, userId);
  if (!todo) throw new NotFoundException('Todo not found');

  return this.todos.remove(todo);
    }

}
