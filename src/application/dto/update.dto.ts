import { IsNotEmpty } from 'class-validator';

export class UpdateApplicationDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  allowed_url: string;

  @IsNotEmpty()
  redirect_url: string;

  @IsNotEmpty()
  status: string;
}
