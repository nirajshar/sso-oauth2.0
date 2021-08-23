import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePocDto } from './dto/create.dto';
import { UpdatePocDto } from './dto/update.dto';
import { PocService } from './poc.service';

@Controller('poc')
export class PocController {
  constructor(private readonly pocService: PocService) {}

  @Get()
  async getAllPoc() {
    return await this.pocService.getAllPoc();
  }

  @Post()
  async createOnePoc(@Body() createPocDto: CreatePocDto) {
    return await this.pocService.createOnePoc(createPocDto);
  }

  @Get('/:id')
  async getOnePoc(@Param('id') id: string) {
    return await this.pocService.getOnePoc(id);
  }

  @Put('/:id')
  async updateOnePoc(
    @Param('id') id: string,
    @Body() updatePocDto: UpdatePocDto,
  ) {
    return await this.pocService.updateOnePoc(id, updatePocDto);
  }

  @Delete('/:id')
  async deleteOnePoc(@Param('id') id: string) {
    return await this.pocService.deleteOnePoc(id);
  }
}
