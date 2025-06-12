import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super(); // Call the constructor of PrismaClient
  }

  // onModuleInit is a NestJS lifecycle hook called once the module is initialized.
  // We use it to connect to the database.
  async onModuleInit() {
    await this.$connect();
    console.log('PrismaService connected to database.');
  }

  // onModuleDestroy is a NestJS lifecycle hook called when the application is shutting down.
  // We use it to disconnect from the database cleanly.
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('PrismaService disconnected from database.');
  }

  // Optional: Enable graceful shutdown hooks
  async enableShutdownHooks(app: any) {
    process.on('beforeExit', async () => {
      await app.close();
      console.log('Application closing due to beforeExit event.');
    });

    process.on('SIGINT', async () => {
      await app.close();
      console.log('Application closing due to SIGINT (Ctrl+C).');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await app.close();
      console.log('Application closing due to SIGTERM.');
      process.exit(0);
    });
  }
}
