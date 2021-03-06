import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { hasRoles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create.dto';
import { UpdateClientDto } from './dto/update.dto';

@Controller('client')
export class ClientController {

    constructor(private readonly clientService: ClientService) {}

    @Get()
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getAllClients() {
        return await this.clientService.getAllClients();
    }

    @Post()
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async createOneClient(@Body() createClientDto: CreateClientDto) {
        return await this.clientService.createOneClient(createClientDto);
    }

    @Get('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getOneClient(@Param('id') id: string) {
        return await this.clientService.getOneClient(id);
    }   

    @Put('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async updateOneClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto ) {
        return await this.clientService.updateOneClient(id, updateClientDto);
    }

    @Delete('/:id')
    @hasRoles('SUPER-ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async deleteOneClient(@Param('id') id: string) {
        return await this.clientService.deleteOneClient(id);
    }
}
