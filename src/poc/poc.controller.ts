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
import { hasRoles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreatePocDto } from './dto/create.dto';
import { UpdatePocDto } from './dto/update.dto';
import { PocService } from './poc.service';

@Controller('poc')
export class PocController {
  constructor(private readonly pocService: PocService) {}

  @Get()
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAllPoc() {
    return await this.pocService.getAllPoc();
  }

  @Post()
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createOnePoc(@Body() createPocDto: CreatePocDto) {
    return await this.pocService.createOnePoc(createPocDto);
  }

  @Get('/:id')
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getOnePoc(@Param('id') id: string) {
    return await this.pocService.getOnePoc(id);
  }

  @Put('/:id')
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateOnePoc(
    @Param('id') id: string,
    @Body() updatePocDto: UpdatePocDto,
  ) {
    return await this.pocService.updateOnePoc(id, updatePocDto);
  }

  @Delete('/:id')
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteOnePoc(@Param('id') id: string) {
    return await this.pocService.deleteOnePoc(id);
  }
}
