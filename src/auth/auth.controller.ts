import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Get('/login')
    async login(@Req() req){
      return await this.authService.login(req);
    }
  
    @Post('/login')
    async doLogin() {
      return await this.authService.doLogin();
    }
  
    @Get('/verify/token')
    async verifyToken() {
      return await this.authService.verifyToken();
    }
  
}
