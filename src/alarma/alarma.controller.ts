import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlarmaService } from './alarma.service';
import { CreateAlarmaDto } from './dto/create-alarma.dto';
import { UpdateAlarmaDto } from './dto/update-alarma.dto';

@Controller('alarma')
export class AlarmaController {
  constructor(private readonly alarmaService: AlarmaService) {}

  @Post()
  create(@Body() createAlarmaDto: CreateAlarmaDto) {
    return this.alarmaService.create(createAlarmaDto);
  }
  @Get('report')
  getAll() {
    return this.alarmaService.getAll();
  }


}
