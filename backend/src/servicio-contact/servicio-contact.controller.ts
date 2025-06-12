import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { ServicioContactService } from './servicio-contact.service';
import { CreateServicioContactDto } from './dto/create-servicio-contact.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express'; // Import Request type
import { Inject } from '@nestjs/common';

@Controller('servicio-contact')
export class ServicioContactController {
  constructor(
    private readonly servicioContactService: ServicioContactService,

  ) {}

  @Post()
  @UseGuards(ThrottlerGuard)
  
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() body: CreateServicioContactDto, @Req() req: Request) {
    const clientIp = req.ip; // Get the client's IP from the request


    const result = await this.servicioContactService.create(body);


    return result;
  }
}