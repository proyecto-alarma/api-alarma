import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColaboradoresService } from './colaboradores.service';
import { CreateColaboradoreDto } from './dto/create-colaboradore.dto';
import { UpdateColaboradoreDto } from './dto/update-colaboradore.dto';

@Controller('colaboradores')
export class ColaboradoresController {
  constructor(private readonly colaboradoresService: ColaboradoresService) {}

  @Post()
  create(@Body() createColaboradoreDto: CreateColaboradoreDto) {
    return this.colaboradoresService.create(createColaboradoreDto);
  }

  @Get()
  findAll() {
    return this.colaboradoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colaboradoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColaboradoreDto: UpdateColaboradoreDto) {
    return this.colaboradoresService.update(+id, updateColaboradoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colaboradoresService.remove(+id);
  }
}
