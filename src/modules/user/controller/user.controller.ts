import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Res,
} from '@nestjs/common';
import { User } from '../../../models/first_db/user.entity';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  home(): string {
    return this.userService.home();
  }

  @Get('all')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('add')
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Delete(':id')
  remove(@Param() id: number): Promise<User> {
    return this.userService.remove(id);
  }

  @Put(':id')
  updateUser(@Param() id: number, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }
}
