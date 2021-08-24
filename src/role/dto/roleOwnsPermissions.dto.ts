import { IsNotEmpty } from "class-validator";


export class RoleOwnsPermissions {

    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

}