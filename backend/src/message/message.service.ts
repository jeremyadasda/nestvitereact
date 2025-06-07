import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '@prisma/client';

// Define an interface for the message data structure

@Injectable()
export class MessageService {
  // This method simulates fetching a message from a database or external source
  //PRISMA
  constructor(private prisma: PrismaService) {} // Inject PrismaService

  async getAllMessages(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }

  async getHelloMessage(): Promise<Message | null> {
    const messages = await this.prisma.message.findMany();
    if (messages.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }
  //PRISMA
}
