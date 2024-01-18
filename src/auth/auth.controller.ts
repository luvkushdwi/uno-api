import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDto } from 'src/utils/dtos/reset-password.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Body() loginDto: LoginDto) {
    const user: User = req.user;
    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      token: '',
    };
    payload.token = this.jwtService.sign(payload);
    const data = await this.userService.updatetoken(payload.userId, payload);
    return {
      data,
    };
  }
}
