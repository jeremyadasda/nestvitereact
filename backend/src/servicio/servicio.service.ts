import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Servicio } from '@prisma/client';

@Injectable()
export class ServicioService {
  constructor(private prisma: PrismaService) {}

  async getAllServicios(): Promise<Servicio[]> {
    return this.prisma.servicio.findMany();
  }

  async getServicioById(id: number): Promise<Servicio | null> {
    return this.prisma.servicio.findUnique({ where: { id } });
  }
}