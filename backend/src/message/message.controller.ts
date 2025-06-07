import { Controller, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';

@Controller('api/message') // All routes in this controller will be prefixed with /api/message
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get() // Handles GET requests to /api/message
  async findAll(): Promise<Message[]> {
    return this.messageService.getAllMessages();
  }

  @Get('hello')
  async findHello(): Promise<Message | null> {
    return this.messageService.getHelloMessage();
  }

 
}
    
