import { Priority } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateToDoDTO{
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(200)
    title: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    descr: string

    @IsNotEmpty()
    @IsEnum(Priority)
    priority: Priority

    @IsNotEmpty()
    @IsString()
    userId: string
}