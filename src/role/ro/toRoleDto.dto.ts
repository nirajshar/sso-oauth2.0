import { RoleDto } from "../dto/role.dto";
import { RoleEntity } from "../entities/role.entity";

export const toRoleDto = (data: RoleEntity): RoleDto => {
  const { name, status, created_at } = data;
  let roleDto: RoleDto = {
    name, status,created_at
  };
  return roleDto;
};
