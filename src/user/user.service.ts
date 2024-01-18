import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { UpdatePasswordUserDto } from './dto/update-password.dto';
import axios from 'axios';
import { AuthGuard } from '@nestjs/passport';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string) {
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

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await this.hashPassword(updateUserDto.password);
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User> {
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

  async changePassword(id, updatePasswordUserDto: UpdatePasswordUserDto) {
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
      } else {
        throw new NotFoundException('Password not match');
      }
    } else {
      throw new NotFoundException('Enter correct password');
    }
  }

  async updatePassword(id, newPassword): Promise<User> {
    const user = await this.findOne(id);
    user.password = await this.hashPassword(newPassword);
    return this.userRepository.save(user);
  }

  async getRandomJoke(): Promise<string> {
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
    return response.data.value;
  }

  async viewprofile(req) {
    const user = req.user;
    const data = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    const { password, token, ...profiledata } = data;
    return profiledata;
  }

  async updatetoken(id, data) {
    const user = await this.userRepository.preload({
      id: data.userId,
      ...data,
    });
    return this.userRepository.save(user);
  }

  async isValidToken(token: string): Promise<boolean> {
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
}
