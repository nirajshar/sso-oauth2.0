import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/client/dto/create.dto';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create.dto';
import { UpdateRoleDto } from './dto/update.dto';
import { RoleEntity } from './entities/role.entity';
import { toRoleDto } from './ro/toRoleDto.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async getAllRoles() {
    const roles = await this.roleRepository.find();

    if (!roles[0]) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Roles not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Roles found',
      roles: roles.map((role) => toRoleDto(role)),
    };
  }

  async createOneRole(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);
      const storeRole = await this.roleRepository.save(role);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Role created successfully',
        role: toRoleDto(role),
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

  async getOneRole(id: string) {
    const role = await this.roleRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!role) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Role not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Role found',
      role: toRoleDto(role),
    };
  }

  async updateOneRole(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!role) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Role not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.roleRepository.update({ id: role.id }, updateRoleDto);

    const updatedRole = await this.roleRepository.findOne({
      where: { id: role.id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Role updated successfully',
      role: toRoleDto(updatedRole),
    };
  }

  async deleteOneRole(id: string) {
    const role = await this.roleRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!role) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Role not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.roleRepository.delete({ id: parseInt(id) });

    return {
      statusCode: HttpStatus.OK,
      message: 'Role deleted successfully',
    };
  }
}
