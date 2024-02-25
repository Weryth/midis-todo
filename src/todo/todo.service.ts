import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateToDoDTO } from './dto/create.todo.dto';
import { UpdateToDoDTO } from './dto/update.todo.dto';

@Injectable()
export class TodoService {

  //Подключаем к нашему сервису prismaService
  constructor(private readonly prismaService: PrismaService) {}

  //Здесь находится вся логика с ToDo карточками
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

  //Работа с пользователем, это, по-хорошему, перенести вообще в другой модуль

  async GetUser(vkId: string) {
    try {
      return await this.prismaService.user.findFirst({ where: { vkId: vkId } });
    } catch (error) {
      throw new HttpException('user nod exist', HttpStatus.NOT_FOUND);
    }
  }

  async CreateUser(viId: string) {
    try {
      return await this.prismaService.user.create({
        data: {
          vkId: viId,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  //Основной контроллер, скажем так, регистрации, мы создаем запись в нашей бд если юзера в ней нет, если есть, просто возвращаем его данные
  async UserController(vkId: string) {
    try {
      const existUser = await this.GetUser(vkId);
      if (!existUser) {
        return await this.CreateUser(vkId);
      }
      return existUser;
    } catch (error) {}
  }
}
