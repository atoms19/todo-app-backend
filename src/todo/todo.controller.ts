import { Controller, Get, Param, ParseIntPipe, Post ,Body, Patch, Delete} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { createTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController{
    constructor(private readonly todoService:TodoService){}

    @Get()
    findAll(){
        return this.todoService.findAll()
    }
    
    @Post()
    create(@Body() newTodo:createTodoDto){
            this.todoService.create(newTodo)
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.todoService.findOne(id)
    }

    @Patch(":id")
    update(@Param('id',ParseIntPipe) id:number,
         @Body() newTodo:UpdateTodoDto){
                return this.todoService.update(id,newTodo)
    }

    @Delete(':id')
    deleteById(@Param('id',ParseIntPipe) id:number){
            this.todoService.remove(id)
    }
    

    @Get('help')
    instructions():string{
        return `
       1) / to get all todos in the view 
       2) /create to make a new todo 
       3) /edit?id to edit a todo
       4) /markl?id to check a todo 
        `
    }
}
