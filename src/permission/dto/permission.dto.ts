import { IsNotEmpty } from 'class-validator';

export class PermissionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: string;
 
  @IsNotEmpty()
  created_at: Date;

}
