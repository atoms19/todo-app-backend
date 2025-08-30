import { Controller, Get, Param, ParseIntPipe, Post ,Body, Patch, Delete, UseGuards, Request} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { createTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todo')
export class TodoController{
    constructor(private readonly todoService:TodoService){}

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() req:{userId:number}){
        // return this.todoService.findAll()
        return this.todoService.findAllForUser(req.userId)
    }
    
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() newTodo:createTodoDto,@Request() req:{userId:number}){
            this.todoService.create(newTodo,req.userId)
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number,@Request() req:{userId:number}){
        return this.todoService.findOne(id,req.userId)
    }

    @UseGuards(AuthGuard)
    @Patch(":id")
    update(@Param('id',ParseIntPipe) id:number ,@Request() req:any,
         @Body() newTodo:UpdateTodoDto){
                return this.todoService.update(id,newTodo,req.userId)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteById(@Param('id',ParseIntPipe) id:number,@Request() req:{userId:number}){
            this.todoService.remove(id,req.userId)
    }
    
}
