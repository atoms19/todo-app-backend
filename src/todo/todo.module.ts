import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TodoController],
  imports:[TypeOrmModule.forFeature([Todo]),AuthModule,JwtModule],
  providers: [TodoService]
})
export class TodoModule {
      
}
