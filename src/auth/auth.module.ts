import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
