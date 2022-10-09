import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return 'Get users';
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return `Get user ${id}`;
  }

  @Post()
  createUser() {
    return 'Create user';
  }

  @Put('/:id')
  updateUser(@Param('id') id: string) {
    return `Update user ${id}`;
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return `Delete user ${id}`;
  }
}
