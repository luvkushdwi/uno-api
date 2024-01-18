// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_KEY'),
    });
  }

  extractTokenFromRequest(request: Request): string | null {
    const authorizationHeader = request.headers['authorization'];

    if (authorizationHeader && typeof authorizationHeader === 'string') {
      const [bearer, token] = authorizationHeader.split(' ');

      if (bearer === 'Bearer' && token) {
        return token;
      }
    }

    return null; // Return null if no valid token is found
  }

  extractPayload(token: string): any {
    // Decode the JWT to get the payload
    try {
      const decodedToken = jwt.verify(token, this.configService.get('JWT_KEY'));
      return decodedToken;
    } catch (error) {
      // Handle verification errors (e.g., invalid signature, expired token)
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validate(payload: any): Promise<any> {
    return {
      userId: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
}
