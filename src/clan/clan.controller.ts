import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClanService } from './clan.service';
import { CreateClanDto } from './dto/create.dto';
import { UpdateClanDto } from './dto/update.dto';

@Controller('clan')
export class ClanController {

    constructor(private readonly clanService: ClanService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllClans() {
        return await this.clanService.getAllClans();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createOneClan(@Body() createClanDto: CreateClanDto) {
        return await this.clanService.createOneClan(createClanDto);
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async getOneClan(@Param('id') id: string) {
        return await this.clanService.getOneClan(id);
    }   

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateOneClan(@Param('id') id: string, @Body() updateClanDto: UpdateClanDto ) {
        return await this.clanService.updateOneClan(id, updateClanDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteOneClan(@Param('id') id: string) {
        return await this.clanService.deleteOneClan(id);
    }

}
