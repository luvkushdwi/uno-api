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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcryptjs");
const axios_1 = require("axios");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        const password1 = password;
        const hash = await bcrypt.hash(password1, saltOrRounds);
        return hash;
    }
    async add(data) {
        data.password = await this.hashPassword(data.password);
        return this.userRepository.save(data);
    }
    async findAll(query) {
        const { page = 1, limit = 10, sortOrder, sortBy = 'id' } = query;
        const [users, total] = await this.userRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: {
                [sortBy]: sortOrder || 'ASC',
            },
        });
        return [users, { Count: total }];
    }
    async findOne(id) {
        return this.userRepository.findOne({
            where: { id },
        });
    }
    async update(id, updateUserDto) {
        updateUserDto.password = await this.hashPassword(updateUserDto.password);
        const user = await this.userRepository.preload(Object.assign({ id: id }, updateUserDto));
        return this.userRepository.save(user);
    }
    async findUserByEmail(email) {
        return await this.userRepository.findOne({
            where: {
                email: email,
            },
        });
    }
    async remove(id) {
        const user = await this.findOne(id);
        return this.userRepository.delete(user);
    }
    async changePassword(id, updatePasswordUserDto) {
        const { oldPassword, newPassword, confirmPassword } = updatePasswordUserDto;
        const user = await this.userRepository.findOne({
            where: { id: id },
        });
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (user && isMatch) {
            if (newPassword == confirmPassword) {
                user.password = await this.hashPassword(newPassword);
                this.userRepository.save(user);
                return 'Password Change Successfully';
            }
            else {
                throw new common_1.NotFoundException('Password not match');
            }
        }
        else {
            throw new common_1.NotFoundException('Enter correct password');
        }
    }
    async updatePassword(id, newPassword) {
        const user = await this.findOne(id);
        user.password = await this.hashPassword(newPassword);
        return this.userRepository.save(user);
    }
    async getRandomJoke() {
        const response = await axios_1.default.get('https://api.chucknorris.io/jokes/random');
        return response.data.value;
    }
    async viewprofile(req) {
        const user = req.user;
        const data = await this.userRepository.findOne({
            where: {
                email: user.email,
            },
        });
        const { password, token } = data, profiledata = __rest(data, ["password", "token"]);
        return profiledata;
    }
    async updatetoken(id, data) {
        const user = await this.userRepository.preload(Object.assign({ id: data.userId }, data));
        return this.userRepository.save(user);
    }
    async isValidToken(token) {
        const user = await this.userRepository.findOne({
            where: {
                token: token,
            },
        });
        return !!user;
    }
    async optimizedcode() {
        const products = [
            { id: 1, sku: 'abc', productName: 'name 1', category: 1 },
            { id: 2, sku: 'def', productName: 'name 2', category: 2 },
            { id: 3, sku: 'ghi', productName: 'name 1', category: 2 },
            { id: 4, sku: 'klm', productName: 'name 1', category: 3 },
            { id: 5, sku: 'xyz', productName: 'name 1', category: 1 },
        ];
        const pricing = [
            { sku: 'abc', price: 10 },
            { sku: 'def', price: 20 },
            { sku: 'ghi', price: 30 },
            { sku: 'klm', price: 40 },
            { sku: 'xyz', price: 50 },
        ];
        const categories = [
            { id: 1, name: 'category1' },
            { id: 2, name: 'category2' },
            { id: 3, name: 'category3' },
            { id: 4, name: 'category4' },
            { id: 5, name: 'category5' },
        ];
        const result = products.map((product) => {
            const { sku, productName, category } = product;
            const { price } = pricing.find((p) => p.sku === sku) || { price: null };
            const { name } = categories.find((c) => c.id === category) || {
                name: null,
            };
            return {
                id: product.id,
                sku,
                productName,
                category,
                price,
                categoryName: name,
            };
        });
        return result;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map