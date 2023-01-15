import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ModeService } from './mode.service';
import { CreateModeDto } from './dto/create-mode.dto';
import { UpdateModeDto } from './dto/update-mode.dto';

@Controller('mode')
export class ModeController {
  constructor(private readonly modeService: ModeService) {}

  @Post('create-mode')
  create(
    @Body() createModeDto: CreateModeDto,
    @Req() header:any,
    
    ) {
    return this.modeService.create(createModeDto, header.headers);
  }


  @Get('get-mode')
  findAll() {
    return this.modeService.findAll();
  }

  @Get('get-historyMode')
  findOne() {
    return this.modeService.getHistoeyMode();
  }

  @Patch('update-mode')
  update( @Body() updateModeDto: UpdateModeDto, @Req() headers:any) {
    return this.modeService.update(updateModeDto, headers.headers);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modeService.remove(+id);
  }
}
