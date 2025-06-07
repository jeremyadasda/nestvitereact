// src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// The @Global() decorator makes the module available everywhere without needing to import it
// in every other module. Use with caution in large applications, but it's convenient
// for services like Prisma that are used almost everywhere.
@Global()
@Module({
  providers: [PrismaService], // PrismaService is provided within this module
  exports: [PrismaService],   // PrismaService is exported, making it available to other modules
})
export class PrismaModule {}