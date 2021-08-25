import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create.dto';
import { UpdateApplicationDTO } from './dto/update.dto';
import { ApplicationEntity } from './entities/application.entity';
import { toApplicationDto } from './ro/toApplicationDto.dto';
import * as crypto from 'crypto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) {}

  async getAllApplications() {
    const applications = await this.applicationRepository.find();

    if (!applications[0]) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Applications not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Applications found',
      applications: applications.map((app) => toApplicationDto(app)),
    };
  }

  async createOneApplication(createApplicationDto: CreateApplicationDto) {
    try {
      const application =
        this.applicationRepository.create(createApplicationDto);
      const storeApplication = await this.applicationRepository.save(
        application,
      );

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Application created successfully',
        application: toApplicationDto(application),
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

  async getOneApplication(id: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });
    if (!application) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Application not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Application found',
      application: toApplicationDto(application),
    };
  }

  async updateOneApplication(
    id: string,
    updateApplicationDTO: UpdateApplicationDTO,
  ) {
    const application = await this.applicationRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!application) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Application not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.applicationRepository.update(
      { id: application.id },
      updateApplicationDTO,
    );

    const updatedApplication = await this.applicationRepository.findOne({
      where: { id: application.id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Application updated successfully',
      application: toApplicationDto(updatedApplication),
    };
  }

  async deleteOneApplication(id: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });

    if (!application) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Application not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.applicationRepository.delete({ id: parseInt(id) });

    return {
      statusCode: HttpStatus.OK,
      message: 'Application deleted successfully',
    };
  }

  // Update Application Secret Token
  async generateNewApplicationSecret(id: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });

    if (!application) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Application not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const secret = crypto.randomBytes(20).toString('hex');
    // console.log(secret);

    const newToken = crypto.createHmac('sha256', secret).digest('hex');

    await this.applicationRepository.update(
      { id: parseInt(id) },
      { application_secret: newToken },
    );

    let updatedApplication = await this.applicationRepository.findOne({
      where: { id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Application Key updated successfully',
      application: toApplicationDto(updatedApplication),
    };
  }

  // Internal use : Functions
  async getListOfApplications() {
    const applications = await this.applicationRepository.find();

    if (!applications[0]) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Applications not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Applications found',
      applications: applications.map((app) => app.allowed_url),
    };
  }
}
