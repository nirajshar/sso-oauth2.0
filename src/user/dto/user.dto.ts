import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {  
    @IsNotEmpty()  
    id: Number;

    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()  
    email: string;

    @IsNotEmpty()
    mobile: string;

}