import { Body, Controller, Get, Post } from '@nestjs/common';
import { Istatus } from 'src/commons/interface/status.interface';
import { StatusService } from 'src/service/status.service';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService:StatusService){}

    @Post('/v1/create-status')
   async create(@Body() istatus:Istatus){
        return await this.statusService.createStatus(istatus);
    }
    @Get('/v1/get-status')
   async getStatus(){
        return await this.statusService.geStatus();
    }
}
