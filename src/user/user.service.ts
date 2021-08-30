import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { toUserDto } from './ro/toUserDto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepository.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ email }: any): Promise<UserDto> {
    return await this.findOne({
      where: { email },
    });
  }

  async create(userDto: CreateUserDto, ip_address: string): Promise<UserDto> {
    const { email, mobile, password } = userDto;

    const userInDb = await this.userRepository.findOne({
      where: [{ email }, { mobile }],
    });
    if (userInDb) {
      throw new HttpException(
        'Email/Mobile already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: UserEntity = await this.userRepository.create({
      ...userDto,
      ip_address,
    });
    await this.userRepository.save(user);
    return toUserDto(user);
  }

  // User Role
  async getUserRole(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['role'],
    });

    // console.log(user);    

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.role && user.role.name ? user.role.name : null;
  }
}
