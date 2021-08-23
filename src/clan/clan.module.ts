import { Module } from '@nestjs/common';
import { ClanService } from './clan.service';
import { ClanController } from './clan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClanEntity } from './entities/clan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClanEntity])],
  providers: [ClanService],
  controllers: [ClanController]
})
export class ClanModule {}
