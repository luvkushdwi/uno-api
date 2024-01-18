import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    login(req: any, loginDto: LoginDto): Promise<{
        data: User;
    }>;
}
