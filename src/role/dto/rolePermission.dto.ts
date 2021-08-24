import { IsNotEmpty } from 'class-validator';
import { PermissionEntity } from 'src/permission/entities/permission.entity';

export class RolePermissionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  created_at: Date;

  owns?: PermissionEntity[];
}
