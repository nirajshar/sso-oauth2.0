import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
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
    // @hasRoles('ADMIN')
    @UseGuards(AuthGuard('jwt'))
    async getAllApplications() {
        return await this.applicationService.getAllApplications();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createOneApplication(@Body() createApplicationDto: CreateApplicationDto) {
        return await this.applicationService.createOneApplication(createApplicationDto);
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async getOneApplication(@Param('id') id: string) {
        return await this.applicationService.getOneApplication(id);
    }   

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateOneApplication(@Param('id') id: string, @Body() updateApplicationDTO: UpdateApplicationDTO ) {
        return await this.applicationService.updateOneApplication(id, updateApplicationDTO);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteOneApplication(@Param('id') id: string) {
        return await this.applicationService.deleteOneApplication(id);
    }

    @Post('/generate-secret/:id')
    @UseGuards(AuthGuard('jwt'))
    async generateNewApplicationSecret(@Param('id') id: string) {
        return this.applicationService.generateNewApplicationSecret(id);
    }
} 
