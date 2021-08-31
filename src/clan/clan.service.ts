import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClanDto } from './dto/create.dto';
import { UpdateClanDto } from './dto/update.dto';
import { ClanEntity } from './entities/clan.entity';
import { toClanDto } from './ro/toClanDto.dto';

@Injectable()
export class ClanService {
  constructor(
    @InjectRepository(ClanEntity)
    private readonly clanRepository: Repository<ClanEntity>,
  ) {}

  async getAllClans() {
    const clans = await this.clanRepository.find();

    if (!clans[0]) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Clans not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Clans found',
      clans: clans.map((clan) => toClanDto(clan)),
    };
  }

  async createOneClan(createClanDto: CreateClanDto) {
    try {
      const clan = await this.clanRepository.create(createClanDto);
      const storeClan = await this.clanRepository.save(clan);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Clan created successfully',
        clan: toClanDto(clan),
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Something went wrong',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getOneClan(id: string) {
    const clan = await this.clanRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!clan) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Clan not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Clan found',
      clan: toClanDto(clan),
    };
  }

  async updateOneClan(id: string, updateClanDto: UpdateClanDto) {
    const clan = await this.clanRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!clan) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Clan not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.clanRepository.update({ id: clan.id }, {
      name: updateClanDto.name,
      client: updateClanDto.client,
      count: updateClanDto.count,
      type: updateClanDto.type
    });

    const updatedClan = await this.clanRepository.findOne({
      where: { id: clan.id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Clan updated successfully',
      clan: toClanDto(updatedClan),
    };
  }

  async deleteOneClan(id: string) {
    const clan = await this.clanRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!clan) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Clan not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.clanRepository.delete({ id: parseInt(id) });

    return {
      statusCode: HttpStatus.OK,
      message: 'Clan deleted successfully',
    };
  }
}
