import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateToDoDTO } from './dto/create.todo.dto';
import { UpdateToDoDTO } from './dto/update.todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  async CreateToDoController(@Body() data: CreateToDoDTO) {
    return this.todoService.CreateToDo(data);
  }

  @Put('update')
  async UpdateToDoController(@Body() data: UpdateToDoDTO) {
    return this.todoService.UpdateToDo(data);
  }

  @Delete('delete/:id')
  async DeleteToDoController(@Param('id') id: string) {
    return this.todoService.DeleteToDo(id);
  }

  @Get(':userid')
  async GetToDoController(
    @Param('userid') id: string,
    @Query('todoid') todoId?: string,
  ) {
    return this.todoService.GetOneTodoOrAll(id, todoId);
  }
}
