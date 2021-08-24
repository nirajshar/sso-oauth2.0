import { IsNotEmpty } from 'class-validator';
import { ApplicationEntity } from 'src/application/entities/application.entity';

export class UpdatePermissionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  application: ApplicationEntity;

}
