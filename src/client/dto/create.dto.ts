import { IsNotEmpty } from 'class-validator';
import { ApplicationEntity } from 'src/application/entities/application.entity';

export class CreateClientDto {
  @IsNotEmpty()  
  actual_name: string;

  @IsNotEmpty()  
  display_name: string;

  @IsNotEmpty()  
  address: string;

  @IsNotEmpty()
  pincode: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  application: ApplicationEntity;
 
}
