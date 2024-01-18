import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordUserDto } from './dto/update-password.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    hashPassword(password: string): Promise<any>;
    add(data: any): Promise<any>;
    findAll(query: any): Promise<(User[] | {
        Count: number;
    })[]>;
    findOne(id: number): Promise<User>;
    update(id: any, updateUserDto: UpdateUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    remove(id: any): Promise<import("typeorm").DeleteResult>;
    changePassword(id: any, updatePasswordUserDto: UpdatePasswordUserDto): Promise<string>;
    updatePassword(id: any, newPassword: any): Promise<User>;
    getRandomJoke(): Promise<string>;
    viewprofile(req: any): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    updatetoken(id: any, data: any): Promise<User>;
    isValidToken(token: string): Promise<boolean>;
    optimizedcode(): Promise<{
        id: number;
        sku: string;
        productName: string;
        category: number;
        price: number;
        categoryName: string;
    }[]>;
}
