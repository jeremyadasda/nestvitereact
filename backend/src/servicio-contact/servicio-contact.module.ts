import { Module } from '@nestjs/common';
import { ServicioContactService } from './servicio-contact.service';
import { ServicioContactController } from './servicio-contact.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServicioContactController],
  providers: [ServicioContactService],
})
export class ServicioContactModule {}