import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Get the PrismaService instance from the app context
  const prismaService = app.get(PrismaService);
  // Call its enableShutdownHooks method for graceful shutdown
  await prismaService.enableShutdownHooks(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
