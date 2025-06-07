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
    try {
      await this.$connect();
      console.log('PrismaService connected to database.');
    } catch (error) {
      console.error('PrismaService failed to connect to database:', error);
      // Depending on your error handling strategy, you might want to throw the error
      // or implement a retry mechanism.
      throw error;
    }
  }

  // onModuleDestroy is a NestJS lifecycle hook called when the application is shutting down.
  // We use it to disconnect from the database cleanly.
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('PrismaService disconnected from database.');
    } catch (error) {
      console.error('PrismaService failed to disconnect from database:', error);
      // Log the error but don't re-throw, as this hook is for graceful shutdown.
    }
  }

  // Optional: Add a method to enable shutdown hooks for the Prisma Client
  // This is useful for graceful shutdown in serverless environments or when
  // dealing with long-running processes that might be terminated unexpectedly.
  // NestJS's built-in lifecycle hooks (onModuleDestroy) often handle this,
  // but this can be a fallback or alternative.
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
