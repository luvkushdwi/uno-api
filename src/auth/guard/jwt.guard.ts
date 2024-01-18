// import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { promises } from 'dns';
// import { UserService } from 'src/user/user.service';
// import { Constants } from 'src/utils/constants';
// import { JwtStrategy } from '../strategy/jwt.strategy';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(
//     private readonly jwtStrategy: JwtStrategy,
//     private readonly userService: UserService,
//   ) {
//     super();
//   }

//   async canActivate(context: ExecutionContext): Promise<any> {
//     const request = context.switchToHttp().getRequest();

//     for (let x = 0; x < Constants.BY_PASS_URLS.length; x++) {
//       if (request.url == Constants.BY_PASS_URLS[x]) {
//         return true; // Skip JWT authentication for specific URLs
//       }
//     }

//     const token = this.jwtStrategy.extractTokenFromRequest(request);

//     if (token) {
//       const isValid = await this.userService.isValidToken(token);

//       if (isValid) {
//         request.user = this.jwtStrategy.extractPayload(token);
//         return true; // Allow access for valid tokens
//       }
//     }

//     return new HttpException('unauthorized', 404); // Deny access for invalid tokens
//   }
// }
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { Constants } from 'src/utils/constants';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtStrategy: JwtStrategy,
    private readonly userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    for (let x = 0; x < Constants.BY_PASS_URLS.length; x++) {
      if (request.url == Constants.BY_PASS_URLS[x]) {
        return true; // Skip JWT authentication for specific URLs
      }
    }

    const token = this.jwtStrategy.extractTokenFromRequest(request);

    if (token) {
      const isValid = await this.userService.isValidToken(token);

      if (isValid) {
        request.user = this.jwtStrategy.extractPayload(token);
        return true; // Allow access for valid tokens
      }
    }

    throw new UnauthorizedException('Unauthorized'); // Throw UnauthorizedException for invalid tokens
  }
}
