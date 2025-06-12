// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { Logger } from '@nestjs/common'; // Ensure Logger is imported
import { AppFileLogger } from './logger'; // Import your custom file logger

// Import the specific application type for Express
import { NestExpressApplication } from '@nestjs/platform-express'; // <-- Add this import

async function bootstrap() {
  // Explicitly type the 'app' instance as NestExpressApplication
  // This tells TypeScript that 'app' will have Express-specific methods.
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new AppFileLogger(), // Use your custom file logger
  });

  // Get the PrismaService instance from the app context
  const prismaService = app.get(PrismaService);
  // Call its enableShutdownHooks method for graceful shutdown
  await prismaService.enableShutdownHooks(app);

  // Configure CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://your-react-app-domain.com'], // Adjust for production
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // CRITICAL: Trust proxy to get the real client IP from X-Forwarded-For header
  // This method is available because 'app' is now typed as NestExpressApplication
  app.set('trust proxy', true); // <-- This line will now work

  // Set a global prefix for all API routes
  app.setGlobalPrefix('api');

  // Listen on port
  const port = process.env.PORT ?? 3000;
  await app.listen(port);


}

bootstrap();