import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    extractTokenFromRequest(request: Request): string | null;
    extractPayload(token: string): any;
    validate(payload: any): Promise<any>;
}
export {};
