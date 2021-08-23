import { IsNotEmpty } from 'class-validator';
import { ApplicationEntity } from 'src/application/entities/application.entity';

export class UpdateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  application: ApplicationEntity;

}
