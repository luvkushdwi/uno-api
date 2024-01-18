import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<any>;
    changePassword(id: string, updatePasswordUserDto: UpdatePasswordUserDto): Promise<string>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    viewprofile(req: any): Promise<{
        id: number;
        name: string;
        email: string;
    }>;
    getRandomJoke(): Promise<string>;
    logout(req: any, res: any): Promise<any>;
    optimizedcode(): Promise<{
        id: number;
        sku: string;
        productName: string;
        category: number;
        price: number;
        categoryName: string;
    }[]>;
}
