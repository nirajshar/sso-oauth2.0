import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { hasRoles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { ClanService } from './clan.service';
import { CreateClanDto } from './dto/create.dto';
import { UpdateClanDto } from './dto/update.dto';

@Controller('clan')
export class ClanController {

    constructor(private readonly clanService: ClanService){}

    @Get()
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getAllClans() {
        return await this.clanService.getAllClans();
    }

    @Post()
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async createOneClan(@Body() createClanDto: CreateClanDto) {
        return await this.clanService.createOneClan(createClanDto);
    }

    @Get('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getOneClan(@Param('id') id: string) {
        return await this.clanService.getOneClan(id);
    }   

    @Put('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async updateOneClan(@Param('id') id: string, @Body() updateClanDto: UpdateClanDto ) {
        return await this.clanService.updateOneClan(id, updateClanDto);
    }

    @Delete('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async deleteOneClan(@Param('id') id: string) {
        return await this.clanService.deleteOneClan(id);
    }

}
