import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { CreateSendMailDto } from './dto/create-send-mail.dto';
import { UpdateSendMailDto } from './dto/update-send-mail.dto';

@Controller('send-mail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  @Post()
  create(@Body() createSendMailDto: CreateSendMailDto) {
    return this.sendMailService.create(createSendMailDto);
  }

  @Get()
  findAll() {
    return this.sendMailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sendMailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSendMailDto: UpdateSendMailDto) {
    return this.sendMailService.update(+id, updateSendMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sendMailService.remove(+id);
  }
}
