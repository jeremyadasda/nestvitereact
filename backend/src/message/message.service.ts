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
  private messages = [
    {
      id: 1,
      content: '¡Bienvenido a ZEROUNO!',
      timestamp: new Date().toISOString(),
      source: 'backend',
    },
    {
      id: 2,
      content: 'Soluciones informáticas a tu medida.',
      timestamp: new Date().toISOString(),
      source: 'backend',
    },
    {
      id: 3,
      content: 'Desarrollamos tu landing page.',
      timestamp: new Date().toISOString(),
      source: 'backend',
    },
    {
      id: 4,
      content: 'Consultoría en la nube AWS y Google.',
      timestamp: new Date().toISOString(),
      source: 'backend',
    },
  ];
  getHelloMessage(): Message {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    // Update timestamp for freshness
    const message = { ...this.messages[randomIndex], timestamp: new Date().toISOString() };
    return message;
  }
}
