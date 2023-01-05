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

  @Get()
  findAll() {
    return this.alarmaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alarmaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlarmaDto: UpdateAlarmaDto) {
    return this.alarmaService.update(+id, updateAlarmaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alarmaService.remove(+id);
  }
}
