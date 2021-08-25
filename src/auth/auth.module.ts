import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, ApplicationModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
