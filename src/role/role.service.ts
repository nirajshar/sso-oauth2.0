import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/permission/entities/permission.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create.dto';
import { RoleOwnsPermissions } from './dto/roleOwnsPermissions.dto';
import { UpdateRoleDto } from './dto/update.dto';
import { RoleEntity } from './entities/role.entity';
import { toRoleDto } from './ro/toRoleDto.dto';
import { toRolePermissionDto } from './ro/toRolePermissionDto.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async getAllRoles() {
    const roles = await this.roleRepository.find({ relations: ['owns'] });

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
      roles: roles.map((role) => toRolePermissionDto(role)),
    };
  }

  async createOneRole(createRoleDto: CreateRoleDto) {
    const roleExists = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });

    if (roleExists) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Role Name already exists',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }

    const role = await this.roleRepository.create(createRoleDto);
    const storeRole = await this.roleRepository.save(role);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Role created successfully',
      role: toRoleDto(role),
    };
  }

  async getOneRole(id: string) {
    const role = await this.roleRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['owns'],
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
      role: toRolePermissionDto(role),
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

    await this.roleRepository.update({ id: role.id }, {
      name: updateRoleDto.name,
      status: updateRoleDto.status
    });

    const updatedRole = await this.roleRepository.findOne({
      where: { id: role.id },
      relations: ['owns'],
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Role updated successfully',
      role: toRolePermissionDto(updatedRole),
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

  /**
   * Role OWNS Permissions
   */

  async grantPermissionsToRole(
    id: string,
    permissions: RoleOwnsPermissions[],
  ): Promise<object> {
    let role = await this.roleRepository.findOne({
      where: { id: id },
      relations: ['owns'],
    });
    // console.log(permissions);

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

    if (permissions.length === 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Permissions to attach required',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    for (let i = 0; i < permissions.length; i++) {
      const newPermission = await this.permissionRepository.findOne({
        where: { id: permissions[i]['id'] },
      });

      if (newPermission) {
        if (
          role.owns.filter((permission) => permission.id === newPermission.id)
            .length < 1
        ) {
          role.owns.push(newPermission);
          await this.roleRepository.save(role);
        }
      }
    }

    role = await this.roleRepository.findOne({
      where: { id: id },
      relations: ['owns'],
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Permission assigned to Role successfully',
      role: toRolePermissionDto(role),
    };
  }

  async revokePermissionsFromRole(
    id: string,
    permissions: RoleOwnsPermissions[],
  ): Promise<object> {
    let role = await this.roleRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['owns'],
    });

    if (!role) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Role not found',
          error: 'Bad Request',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (permissions.length === 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Permissions to attach required',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    for (let i = 0; i < permissions.length; i++) {
      const oldPermission = await this.permissionRepository.findOne({
        where: { id: permissions[i]['id'] },
      });

      if (oldPermission) {
        if (
          role.owns.filter((permission) => permission.id === oldPermission.id)
            .length > 0
        ) {
          role.owns = role.owns.filter(
            (permission) => permission.id !== oldPermission.id,
          );
          await this.roleRepository.save(role);
        }
      }
    }

    role = await this.roleRepository.findOne({
      where: { id: id },
      relations: ['owns'],
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Permission revoked from Role successfully',
      role: toRolePermissionDto(role),
    };
  }

  /**
   * User vs Role
   */

  async assignRoleToUser() {}

  async revokeRoleFromUser() {}
}
