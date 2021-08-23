import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env.development',
  }),   
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: Number(process.env.MYSQL_DB_PORT),
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME,
    entities: ["dist/**/**.entity{.ts,.js}"],
    synchronize: true,
  }),
  AuthModule,
  UserModule,
  ApplicationModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
