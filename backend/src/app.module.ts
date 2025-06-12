import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ServicioModule } from './servicio/servicio.module';
import { ServicioContactModule } from './servicio-contact/servicio-contact.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ServicioContactController } from './servicio-contact/servicio-contact.controller';
import { ServicioContactService } from './servicio-contact/servicio-contact.service';

@Module({
  imports: [
    MessageModule,
    PrismaModule,
    ServicioModule,
    ServicioContactModule,
    ThrottlerModule.forRoot({
      // Define your throttler configurations here
      throttlers: [
        {
          name: 'default', // A default throttler applied globally (unless overridden)
          ttl: 60000,     // 60 seconds (in milliseconds)
          limit: 40,      // Allow 10 requests per 60 seconds
        },
        {
          name: 'form-submit', // A more strict throttler for form submissions
          ttl: 30000,     // 30 seconds
          limit: 10,       // Allow only 2 form submissions per 30 seconds
        },
        // Add more named throttlers as needed (e.g., 'login-attempts', 'password-reset')
      ],
    }),
  ],
  controllers: [AppController , ServicioContactController],
  providers: [
    AppService,
    ServicioContactService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    Logger,
  ],
})
export class AppModule {}
