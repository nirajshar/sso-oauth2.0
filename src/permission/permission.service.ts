import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create.dto';
import { UpdatePermissionDto } from './dto/update.dto';
import { PermissionEntity } from './entities/permission.entity';
import { toPermissionDto } from './ro/toPermissionDto.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async getAllPermissions() {
    const permissions = await this.permissionRepository.find();

    if (!permissions[0]) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Permissions not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Permissions found',
      permissions: permissions.map((permission) => toPermissionDto(permission)),
    };
  }

  async createOnePermission(createPermissionDto: CreatePermissionDto) {
    const permissionExists = this.permissionRepository.findOne({
      where: { name: createPermissionDto.name },
    });

    if (permissionExists) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Permission Name already exists',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }

    const permission = this.permissionRepository.create(createPermissionDto);
    const storePermission = await this.permissionRepository.save(permission);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Permission created successfully',
      permission: toPermissionDto(permission),
    };
  }

  async getOnePermission(id: string) {
    const permission = await this.permissionRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!permission) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Permission not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Permission found',
      permission: toPermissionDto(permission),
    };
  }

  async updateOnePermission(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ) {
    const permission = await this.permissionRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!permission) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Permission not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.permissionRepository.update(
      { id: permission.id },
      updatePermissionDto,
    );

    const updatedPermission = await this.permissionRepository.findOne({
      where: { id: permission.id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Permission updated successfully',
      permission: toPermissionDto(updatedPermission),
    };
  }

  async deleteOnePermission(id: string) {
    const permission = await this.permissionRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!permission) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Permission not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.permissionRepository.delete({ id: parseInt(id) });

    return {
      statusCode: HttpStatus.OK,
      message: 'Permission deleted successfully',
    };
  }
}
