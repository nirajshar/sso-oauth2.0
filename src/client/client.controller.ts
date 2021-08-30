import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create.dto';
import { UpdateClientDto } from './dto/update.dto';

@Controller('client')
export class ClientController {

    constructor(private readonly clientService: ClientService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllClients() {
        return await this.clientService.getAllClients();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createOneClient(@Body() createClientDto: CreateClientDto) {
        return await this.clientService.createOneClient(createClientDto);
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async getOneClient(@Param('id') id: string) {
        return await this.clientService.getOneClient(id);
    }   

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateOneClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto ) {
        return await this.clientService.updateOneClient(id, updateClientDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteOneClient(@Param('id') id: string) {
        return await this.clientService.deleteOneClient(id);
    }
}
