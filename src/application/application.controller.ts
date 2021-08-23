import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create.dto';
import { UpdateApplicationDTO } from './dto/update.dto';

@Controller('application')
export class ApplicationController {

    constructor(private readonly applicationService: ApplicationService) {}
    
    @Get()
    async getAllApplications() {
        return await this.applicationService.getAllApplications();
    }

    @Post()
    async createOneApplication(@Body() createApplicationDto: CreateApplicationDto) {
        return await this.applicationService.createOneApplication(createApplicationDto);
    }

    @Get('/:id')
    async getOneApplication(@Param('id') id: string) {
        return await this.applicationService.getOneApplication(id);
    }   

    @Put('/:id')
    async updateOneApplication(@Param('id') id: string, @Body() updateApplicationDTO: UpdateApplicationDTO ) {
        return await this.applicationService.updateOneApplication(id, updateApplicationDTO);
    }

    @Delete('/:id')
    async deleteOneApplication(@Param('id') id: string) {
        return await this.applicationService.deleteOneApplication(id);
    }

    @Post('/generate-secret/:id')
    async generateNewApplicationSecret(@Param('id') id: string) {
        return this.applicationService.generateNewApplicationSecret(id);
    }
} 
