import { ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private readonly jwtStrategy;
    private readonly userService;
    constructor(jwtStrategy: JwtStrategy, userService: UserService);
    canActivate(context: ExecutionContext): Promise<any>;
}
export {};
