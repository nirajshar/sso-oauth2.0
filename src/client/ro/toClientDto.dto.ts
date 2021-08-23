import { ClientDto } from '../dto/client.dto';
import { ClientEntity } from '../entities/client.entity';

export const toClientDto = (data: ClientEntity): ClientDto => {
  const {
    actual_name,
    display_name,
    email,
    contact,
    status,
    application,
    created_at,
  } = data;
  const { address, pincode, city, state, country } = data;
  let clientDto: ClientDto = {
    actual_name,
    display_name,
    email,
    contact,
    status,
    application,
    created_at,
    address,
    pincode,
    city,
    state,
    country,
  };
  return clientDto;
};
