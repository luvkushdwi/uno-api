"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("../../user/user.service");
const constants_1 = require("../../utils/constants");
const jwt_strategy_1 = require("../strategy/jwt.strategy");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(jwtStrategy, userService) {
        super();
        this.jwtStrategy = jwtStrategy;
        this.userService = userService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        for (let x = 0; x < constants_1.Constants.BY_PASS_URLS.length; x++) {
            if (request.url == constants_1.Constants.BY_PASS_URLS[x]) {
                return true;
            }
        }
        const token = this.jwtStrategy.extractTokenFromRequest(request);
        if (token) {
            const isValid = await this.userService.isValidToken(token);
            if (isValid) {
                request.user = this.jwtStrategy.extractPayload(token);
                return true;
            }
        }
        throw new common_1.UnauthorizedException('Unauthorized');
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_strategy_1.JwtStrategy,
        user_service_1.UserService])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt.guard.js.map