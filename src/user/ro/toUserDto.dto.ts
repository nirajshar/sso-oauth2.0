import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, first_name, last_name, email, mobile } = data;
    let userDto: UserDto = {  id, first_name, last_name, email, mobile   };
    return userDto;
};

