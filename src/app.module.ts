import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [TodoModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
