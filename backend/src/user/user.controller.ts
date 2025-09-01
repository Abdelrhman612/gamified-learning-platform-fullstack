import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { Roles } from 'src/utils/decorators/role.decorator';
import { AuthGuards } from 'src/Auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuards)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @Roles(['admin'])
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(updateUserDto, id);
  }

  @Delete(':id')
  @Roles(['admin'])
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
