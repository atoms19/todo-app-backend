import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';


export class createTodoDto{
@IsString()
@IsNotEmpty()
title:string

@IsBoolean()
done:boolean
    
}
