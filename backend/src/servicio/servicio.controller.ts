import { Controller, Get, Param } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { Servicio } from '@prisma/client';

@Controller('servicio')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Get()
  async findAll(): Promise<Servicio[]> {
    return this.servicioService.getAllServicios();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Servicio | null> {
    return this.servicioService.getServicioById(Number(id));
  }
}