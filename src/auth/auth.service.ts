import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/dto/jwtPayload.interface';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { LoginUserDto } from 'src/user/dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);

      if (user) {
        return {
          statusCode: HttpStatus.OK,
          message: 'User created successfully',
        };
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Request Failed',
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.EXPECTATION_FAILED,
          message: 'Something went wrong',
          error: 'Expectation Failed',
        },
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByLogin(loginUserDto);

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Credentials',
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this._createToken(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      ...token,
    };
  }

  private _createToken({ email }: UserDto) {
    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.JWT_EXPIRES_IN,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid token',
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
