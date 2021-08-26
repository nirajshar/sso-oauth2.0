import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/dto/jwtPayload.interface';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { LoginUserDto } from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto) {
     return await this.authService.register( createUserDto );  
    }
  
    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto){
      return await this.authService.login(loginUserDto);
    }
  
    @Get('whoami')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any) {     
      return req.user;
    }
  
}
