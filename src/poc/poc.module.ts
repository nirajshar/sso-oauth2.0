import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PocEntity } from './entities/poc.entity';
import { PocController } from './poc.controller';
import { PocService } from './poc.service';

@Module({
  imports: [TypeOrmModule.forFeature([PocEntity])],
  controllers: [PocController],
  providers: [PocService]
})
export class PocModule {}
