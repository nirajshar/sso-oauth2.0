import { Body, Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req) {
    return this.appService.getHello();
  }

  @Get('/create/cookie')
  async getViews(@Req() req, @Res({ passthrough: true }) response: Response) {
    return await this.appService.createCookie(req, response);
  }
}
