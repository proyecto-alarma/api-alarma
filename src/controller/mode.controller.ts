import { Body, Controller, Get, Post } from '@nestjs/common';
import { Imodo } from 'src/commons/interface/modo.interface';
import { ModeService } from 'src/service/mode.service';

@Controller('mode')
export class ModeController {

    constructor(private readonly statusService: ModeService) { }

    @Post('/v1/create-mode')
    async create(@Body() istatus: Imodo) {
        return await this.statusService.createMode(istatus);
    }
    @Get('/v1/get-mode')
    async getStatus() {
        return await this.statusService.geMode();
    }
}
