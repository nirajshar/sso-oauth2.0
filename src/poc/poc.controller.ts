import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePocDto } from './dto/create.dto';
import { UpdatePocDto } from './dto/update.dto';
import { PocService } from './poc.service';

@Controller('poc')
export class PocController {
  constructor(private readonly pocService: PocService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllPoc() {
    return await this.pocService.getAllPoc();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createOnePoc(@Body() createPocDto: CreatePocDto) {
    return await this.pocService.createOnePoc(createPocDto);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getOnePoc(@Param('id') id: string) {
    return await this.pocService.getOnePoc(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateOnePoc(
    @Param('id') id: string,
    @Body() updatePocDto: UpdatePocDto,
  ) {
    return await this.pocService.updateOnePoc(id, updatePocDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteOnePoc(@Param('id') id: string) {
    return await this.pocService.deleteOnePoc(id);
  }
}
