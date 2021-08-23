import { ClanDto } from "../dto/clan.dto";
import { ClanEntity } from "../entities/clan.entity";


export const toClanDto = (data: ClanEntity): ClanDto => {
  const { name, count, type, client, created_at } = data;
  let clanDto: ClanDto = {
    name, count, type, client, created_at 
  };
  return clanDto;
};
