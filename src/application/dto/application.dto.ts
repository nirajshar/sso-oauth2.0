import { IsNotEmpty } from "class-validator";

export class ApplicationDto {  
    @IsNotEmpty()
    name: string;  
  
    @IsNotEmpty()
    allowed_url: string;
  
    @IsNotEmpty()
    redirect_url: string;
  
    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    created_at: Date;
}