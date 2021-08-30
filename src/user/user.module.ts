import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from 'src/application/entities/application.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ApplicationEntity])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
