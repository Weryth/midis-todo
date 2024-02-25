import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateToDoDTO } from './dto/create.todo.dto';
import { UpdateToDoDTO } from './dto/update.todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async CreateUser(viId: string) {
    try {
      return this.prismaService.user.create({
        data: {
          vkId: viId,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async CreateToDo(data: CreateToDoDTO) {
    try {
      return await this.prismaService.toDo.create({
        data: {
          title: data.title,
          descr: data.descr,
          priority: data.priority,
          userId: data.userId,
        },
      });
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  async UpdateToDo(data: UpdateToDoDTO) {
    try {
      return await this.prismaService.toDo.update({
        where: { id: data.toDoId },
        data: {
          title: data.title,
          descr: data.descr,
          priority: data.priority,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async DeleteToDo(id: string) {
    try {
      await this.prismaService.toDo.delete({ where: { id: id } });
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException('To do is not exist', HttpStatus.NOT_FOUND);
    }
  }

  async GetOneTodoOrAll(userId: string, todoId?: string) {
    try {
      if (todoId) {
        return this.prismaService.toDo.findFirst({ where: { id: todoId } });
      } else {
        return this.prismaService.toDo.findMany({ where: { userId: userId } });
      }
    } catch (error) {}
  }

  async GetUser(vkId: string) {
    try {
      return this.prismaService.user.findFirst({ where: { vkId: vkId } });
    } catch (error) {
      throw new HttpException('user nod exist', HttpStatus.NOT_FOUND);
    }
  }
}
