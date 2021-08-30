import { IsNotEmpty } from "class-validator";


export class userHasApplications {

    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

}