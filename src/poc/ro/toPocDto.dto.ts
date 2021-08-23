import { PocDto } from "../dto/poc.dto";
import { PocEntity } from "../entities/poc.entity";


export const toPocDto = (data: PocEntity): PocDto => {
  const { name, email, contact, status, client,  created_at } = data;
  let pocDto: PocDto = {
    name, email, contact, status, client,  created_at
  };
  return pocDto;
};
