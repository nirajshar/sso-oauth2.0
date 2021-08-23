import { ApplicationDto } from '../dto/application.dto';
import { ApplicationEntity } from '../entities/application.entity';

export const toApplicationDto = (data: ApplicationEntity): ApplicationDto => {
  const { name, allowed_url, redirect_url, status, created_at } = data;
  let applicationDto: ApplicationDto = {
    name,
    allowed_url,
    redirect_url,
    status,
    created_at,
  };
  return applicationDto;
};
