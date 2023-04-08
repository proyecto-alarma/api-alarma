import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IhistoryStatus } from 'src/commons/interface/history.status.interface';
import { HistoryStatus } from 'src/commons/schema/history.status.schema';

@Injectable()
export class HistoryStatusService {

    constructor(
        @InjectModel(HistoryStatus.name)
        private readonly historStatus: Model<HistoryStatus>,
    ) { }




    async createHistory(history: IhistoryStatus) {
        try {
            await this.historStatus.create(history);
        } catch (error) {

        }
    }
    async getHistoryStatus() {
        try {
            return await this.historStatus.find();
        } catch (error) {

        }
    }

}
