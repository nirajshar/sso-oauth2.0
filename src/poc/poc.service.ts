import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePocDto } from './dto/create.dto';
import { UpdatePocDto } from './dto/update.dto';
import { PocEntity } from './entities/poc.entity';
import { toPocDto } from './ro/toPocDto.dto';

@Injectable()
export class PocService {
  constructor(
    @InjectRepository(PocEntity)
    private readonly pocRepository: Repository<PocEntity>,
  ) {}

  async getAllPoc() {
    const pocs = await this.pocRepository.find();

    if (!pocs[0]) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'POCs not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'POCs found',
      pocs: pocs.map((poc) => toPocDto(poc)),
    };
  }

  async createOnePoc(createPocDto: CreatePocDto) {
    const pocExists = await this.pocRepository.findOne({
      where: [{ email: createPocDto.email }, { contact: createPocDto.contact }],
    });

    if (pocExists) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'POC Email / Contact already exists',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }

    const poc = await this.pocRepository.create(createPocDto);
    const storePoc = await this.pocRepository.save(poc);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'POC created successfully',
      poc: toPocDto(poc),
    };
  }

  async getOnePoc(id: string) {
    const poc = await this.pocRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!poc) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'POC not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'POC found',
      poc: toPocDto(poc),
    };
  }

  async updateOnePoc(id: string, updatePocDto: UpdatePocDto) {
    const poc = await this.pocRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!poc) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'POC not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.pocRepository.update(
      { id: poc.id },
      {
        name: updatePocDto.name,
        email: updatePocDto.email,
        contact: updatePocDto.contact,
        client: updatePocDto.client,
        status: updatePocDto.status,
      },
    );

    const updatedPoc = await this.pocRepository.findOne({
      where: { id: poc.id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'POC updated successfully',
      poc: toPocDto(updatedPoc),
    };
  }

  async deleteOnePoc(id: string) {
    const poc = await this.pocRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!poc) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'POC not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.pocRepository.delete({ id: parseInt(id) });

    return {
      statusCode: HttpStatus.OK,
      message: 'POC deleted successfully',
    };
  }
}
