import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create.dto';
import { UpdateClientDto } from './dto/update.dto';
import { ClientEntity } from './entities/client.entity';
import { toClientDto } from './ro/toClientDto.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async getAllClients() {
    const clients = await this.clientRepository.find();

    if (!clients[0]) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Clients not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Clients found',
      clients: clients.map((client) => toClientDto(client)),
    };
  }

  async createOneClient(createClientDto: CreateClientDto) {
    const clientExists = await this.clientRepository.findOne({
      where: [
        { email: createClientDto.email },
        { actual_name: createClientDto.actual_name },
      ],
    });

    console.log(clientExists);
    

    if (clientExists) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Client Name / Email already exists',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }

    const client = await this.clientRepository.create(createClientDto);
    const storeClient = await this.clientRepository.save(client);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Client created successfully',
      client: toClientDto(client),
    };
  }

  async getOneClient(id: string) {
    const client = await this.clientRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!client) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Client not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Client found',
      client: toClientDto(client),
    };
  }

  async updateOneClient(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!client) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Client not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.clientRepository.update({ id: client.id }, {
      actual_name: updateClientDto.actual_name,
      display_name: updateClientDto.display_name,
      address: updateClientDto.address,
      application: updateClientDto.application,
      city: updateClientDto.city,
      contact: updateClientDto.contact,
      country: updateClientDto.country,
      email: updateClientDto.email,
      pincode: updateClientDto.pincode,
      state: updateClientDto.state,
      status: updateClientDto.status
    });

    const updatedClient = await this.clientRepository.findOne({
      where: { id: client.id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Client updated successfully',
      client: toClientDto(updatedClient),
    };
  }

  async deleteOneClient(id: string) {
    const client = await this.clientRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!client) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Client not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.clientRepository.delete({ id: parseInt(id) });

    return {
      statusCode: HttpStatus.OK,
      message: 'Client deleted successfully',
    };
  }
}
