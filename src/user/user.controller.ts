import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Inject,
  forwardRef,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('User')
@ApiSecurity('JWT-auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.add(createUserDto);
  }

  @Post('/changepassword/:id')
  changePassword(
    @Param('id') id: string,
    @Body() updatePasswordUserDto: UpdatePasswordUserDto,
  ) {
    return this.userService.changePassword(id, updatePasswordUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get('/me')
  viewprofile(@Req() req) {
    return this.userService.viewprofile(req);
  }

  @Get('/random-joke')
  getRandomJoke() {
    return this.userService.getRandomJoke();
  }

  @Post('/logout')
  async logout(@Req() req, @Res() res) {
    const user: any = req.user;
    const payload = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      token: '',
    };
    await this.userService.updatetoken(payload.userId, payload);
    return res.json({ message: 'Logout successful' });
  }

  @Get('/optmized-code')
  async optimizedcode() {
    return await this.userService.optimizedcode();
  }
}
