import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServicioContact } from '@prisma/client';

@Injectable()
export class ServicioContactService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; email: string; comment: string; servicioId: number }): Promise<ServicioContact> {
    return this.prisma.servicioContact.create({ data });
  }
}