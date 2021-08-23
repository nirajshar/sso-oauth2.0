import { RoleDto } from "../dto/role.dto";
import { RoleEntity } from "../entities/role.entity";

export const toRoleDto = (data: RoleEntity): RoleDto => {
  const { name, status, application, created_at } = data;
  let roleDto: RoleDto = {
    name, status, application, created_at
  };
  return roleDto;
};
