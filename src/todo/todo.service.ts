import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { createTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private todos:Repository<Todo>){}
    private id=1

    create(dto:createTodoDto){
       const todo=this.todos.create(dto)
       return this.todos.save(todo)
    }
    findAll(){
        return this.todos.find()
    }
    findOne(id:number){
        return this.todos.findOneBy({id})
    }

  async update(id: number, dto: UpdateTodoDto) {
    await this.todos.update(id, dto);
    return this.findOne(id);
  }
    remove(id:number){
        return this.todos.delete(id)
    }

}
