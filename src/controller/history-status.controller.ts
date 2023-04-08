import { Controller, Get } from '@nestjs/common';
import { HistoryStatusService } from 'src/service/history-status.service';

@Controller('history-status')
export class HistoryStatusController {

    constructor(private readonly historService: HistoryStatusService) { }
    @Get('v1/get-history-status')
    async getHistoryStatus() {
        return await this.historService.getHistoryStatus();
    }
}
