import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt.guard';

@Module({
  imports: [
    PassportModule,
    UserModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
          secret: configService.get("JWT_KEY"),
          signOptions: {
              expiresIn: configService.get<string>("JWT_EXPIRE") + "s" // "60s"
          }
      })
  })],
  
  controllers: [AuthController],
  providers: [JwtStrategy,JwtAuthGuard,LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  exports:[JwtStrategy]
})
export class AuthModule {}
