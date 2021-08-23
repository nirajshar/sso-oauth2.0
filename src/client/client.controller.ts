import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create.dto';
import { UpdateClientDto } from './dto/update.dto';

@Controller('client')
export class ClientController {

    constructor(private readonly clientService: ClientService) {}

    @Get()
    async getAllClients() {
        return await this.clientService.getAllClients();
    }

    @Post()
    async createOneClient(@Body() createClientDto: CreateClientDto) {
        return await this.clientService.createOneClient(createClientDto);
    }

    @Get('/:id')
    async getOneClient(@Param('id') id: string) {
        return await this.clientService.getOneClient(id);
    }   

    @Put('/:id')
    async updateOneClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto ) {
        return await this.clientService.updateOneClient(id, updateClientDto);
    }

    @Delete('/:id')
    async deleteOneClient(@Param('id') id: string) {
        return await this.clientService.deleteOneClient(id);
    }
}
