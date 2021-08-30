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
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create.dto';
import { UpdateApplicationDTO } from './dto/update.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAllApplications() {
    return await this.applicationService.getAllApplications();
  }

  @Post()
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createOneApplication(
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return await this.applicationService.createOneApplication(
      createApplicationDto,
    );
  }

  @Get('/:id')
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getOneApplication(@Param('id') id: string) {
    return await this.applicationService.getOneApplication(id);
  }

  @Put('/:id')
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateOneApplication(
    @Param('id') id: string,
    @Body() updateApplicationDTO: UpdateApplicationDTO,
  ) {
    return await this.applicationService.updateOneApplication(
      id,
      updateApplicationDTO,
    );
  }

  @Delete('/:id')
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteOneApplication(@Param('id') id: string) {
    return await this.applicationService.deleteOneApplication(id);
  }

  @Post('/generate-secret/:id')
  @hasRoles('SUPER-ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async generateNewApplicationSecret(@Param('id') id: string) {
    return this.applicationService.generateNewApplicationSecret(id);
  }
}
