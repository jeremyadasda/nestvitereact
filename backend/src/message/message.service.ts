import { Injectable } from '@nestjs/common';

// Define an interface for the message data structure
interface Message {
  id: number;
  content: string;
  timestamp: string;
  source: string;
}

@Injectable()
export class MessageService {
  // This method simulates fetching a message from a database or external source
  getHelloMessage(): Message {
    return {
      id: 1,
      content: 'Desarrollo de Aplicaciones Web y Sistemas en la Nube',
      timestamp: new Date().toISOString(),
      source: 'NestJS'
    };
  }
}
