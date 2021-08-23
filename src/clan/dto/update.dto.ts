import { IsNotEmpty } from 'class-validator';
import { ClientEntity } from 'src/client/entities/client.entity';

export class UpdateClanDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  count: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  client: ClientEntity;

}
