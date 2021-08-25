import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Get('/login')
    async login(@Req() req, @Res() res){
      return await this.authService.login(req, res);
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
