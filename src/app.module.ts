import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/entities/todo.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TodoModule,TypeOrmModule.forRoot({
     type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'devuser',
  password: 'devpass',
  database: 'devdb', 
    entities:[Todo,User]
    ,synchronize:true
  }), UserModule, AuthModule],
  controllers:[], 
  providers: [],
})
export class AppModule {}
