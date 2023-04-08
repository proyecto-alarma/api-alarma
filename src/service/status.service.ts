import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Istatus } from 'src/commons/interface/status.interface';
import { Status } from 'src/commons/schema/status.schema';
import { HistoryStatusService } from './history-status.service';

@Injectable()
export class StatusService {
    constructor(
        @InjectModel(Status.name)
        private readonly statusModel: Model<Status>,
        private readonly historyStatusService: HistoryStatusService
    ) { }
    async createStatus(istatus: Istatus) {
        try {
            const lastResult = await this.statusModel.findOne().sort({ $natural: -1 });
            if (!lastResult) {
                await this.statusModel.create(istatus)
            } else {
                await this.statusModel.updateOne(istatus);
            }
            await this.historyStatusService.createHistory({
                currentStatus: istatus.status,
                lastStatus: lastResult == null ? istatus.status : lastResult.status,
                date: new Date()
            });

        } catch (error) {
        }
    }


    async geStatus() {
        try {
            const lastResult = await this.statusModel.findOne().sort({ $natural: -1 });

            return lastResult;

        } catch (error) {

        }
    }

}
