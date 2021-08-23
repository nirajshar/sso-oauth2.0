import { IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  application_key: string;

  @IsNotEmpty()
  application_secret: string;

  @IsNotEmpty()
  allowed_url: string;

  @IsNotEmpty()
  redirect_url: string;

  @IsNotEmpty()
  status: string;
}
