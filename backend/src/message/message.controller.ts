import { Controller, Get } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('api/message') // All routes in this controller will be prefixed with /api/message
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get() // Handles GET requests to /api/message
  getHello(): any { // Using 'any' for simplicity; in a real app, you'd define a return type interface
    return this.messageService.getHelloMessage();
  }
}
    
