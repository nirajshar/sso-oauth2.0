import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClanService } from './clan.service';
import { CreateClanDto } from './dto/create.dto';
import { UpdateClanDto } from './dto/update.dto';

@Controller('clan')
export class ClanController {

    constructor(private readonly clanService: ClanService){}

    @Get()
    async getAllClans() {
        return await this.clanService.getAllClans();
    }

    @Post()
    async createOneClan(@Body() createClanDto: CreateClanDto) {
        return await this.clanService.createOneClan(createClanDto);
    }

    @Get('/:id')
    async getOneClane(@Param('id') id: string) {
        return await this.clanService.getOneClan(id);
    }   

    @Put('/:id')
    async updateOneClan(@Param('id') id: string, @Body() updateClanDto: UpdateClanDto ) {
        return await this.clanService.updateOneClan(id, updateClanDto);
    }

    @Delete('/:id')
    async deleteOneClan(@Param('id') id: string) {
        return await this.clanService.deleteOneClan(id);
    }

}
