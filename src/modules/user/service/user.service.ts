import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../models/first_db/user.entity';
import { Repository } from 'typeorm';

export interface UserInterface {
  id: number;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User,'default')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const all_user = await this.userRepository.find();
      return all_user;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const one_user = await this.userRepository.findOne(id);
      if (!one_user) {
        throw new HttpException(`id is not found`, HttpStatus.NOT_FOUND);
      }

      return one_user;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new HttpException(`id is not found`, HttpStatus.BAD_REQUEST);
      }

      return this.userRepository.remove(user);
    } catch (err) {
      throw err;
    }
  }

  async createUser(user: UserInterface): Promise<User> {
    try {
      const new_user = await this.userRepository.create({
        username: user.username,
        password: user.password,
        role: user.role,
      });
      if (!new_user.username || !new_user.password || !new_user.role) {
        throw new HttpException(
          `The key values is not exist or key value are not suite for requirement`,
          HttpStatus.NON_AUTHORITATIVE_INFORMATION,
        );
      }

      return this.userRepository.save(new_user);
    } catch (err) {
      throw err;
    }
  }

  async updateUser( id: number, user: UserInterface): Promise<User> {
    try {
      const user_id = await this.userRepository.findOne(id);
      if (!user_id) {
        throw new HttpException(
          `ID not found`,
          HttpStatus.NON_AUTHORITATIVE_INFORMATION,
        );
      }else {
        this.userRepository.merge(user_id,user)
        return this.userRepository.save(user_id);
      }

    } catch (err) {
      throw err;
    }
  }

  home(): string {
    return 'this is users home page';
  }
}
