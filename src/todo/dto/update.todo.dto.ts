import { IsNotEmpty, IsString } from 'class-validator';
import { CreateToDoDTO } from './create.todo.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateToDoDTO extends PartialType(OmitType(CreateToDoDTO, ['userId'] as const),) {

  @IsString()
  @IsNotEmpty()
  toDoId: string;
  
}
