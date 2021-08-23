import { IsNotEmpty } from 'class-validator';
import { ClientEntity } from 'src/client/entities/client.entity';

export class ClanDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  count: Number;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  created_at: Date;

  @IsNotEmpty()
  client: ClientEntity;
}
