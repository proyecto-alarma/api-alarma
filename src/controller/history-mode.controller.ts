import { Controller, Get } from '@nestjs/common';
import { HistoryModeService } from 'src/service/history-mode.service';

@Controller('history-mode')
export class HistoryModeController {
    constructor(private readonly historService: HistoryModeService) { }
    @Get('v1/get-history-mode')
    async getHistoryStatus() {
        return await this.historService.getHistoryStatus();
    }
}
