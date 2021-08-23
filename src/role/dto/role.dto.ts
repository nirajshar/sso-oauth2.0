import { IsNotEmpty } from 'class-validator';
import { ApplicationEntity } from 'src/application/entities/application.entity';

export class RoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: string;
 
  @IsNotEmpty()
  created_at: Date;

  @IsNotEmpty()
  application: ApplicationEntity;

}
