import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  controllers: [TodoController],
  imports:[TypeOrmModule.forFeature([Todo])],
  providers: [TodoService]
})
export class TodoModule {
      
}
