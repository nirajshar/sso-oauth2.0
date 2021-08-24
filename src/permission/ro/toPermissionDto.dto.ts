import { PermissionDto } from '../dto/permission.dto';
import { PermissionEntity } from '../entities/permission.entity';

export const toPermissionDto = (data: PermissionEntity): PermissionDto => {
  const { name, status, application, created_at } = data;
  let permissionDto: PermissionDto = {
    name,
    status,
    application,
    created_at,
  };
  return permissionDto;
};
