import { RolePermissionDto } from "../dto/rolePermission.dto";
import { RoleEntity } from "../entities/role.entity";

export const toRolePermissionDto = (data: RoleEntity): RolePermissionDto => {
  const { name, status, created_at, owns } = data;
  let rolePermissionDto: RolePermissionDto = {
    name, status, created_at, owns
  };
  return rolePermissionDto;
};
