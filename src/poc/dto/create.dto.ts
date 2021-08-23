import { IsNotEmpty } from 'class-validator';
import { ClientEntity } from 'src/client/entities/client.entity';

export class CreatePocDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  client: ClientEntity;
}
