import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IhistoryNode } from 'src/commons/interface/history.mode.interface';
import { HistoryMode } from 'src/commons/schema/history.mode.schema';

@Injectable()
export class HistoryModeService {
    constructor(
        @InjectModel(HistoryMode.name)
        private readonly historyMode: Model<HistoryMode>,
    ) { }




    async createHistory(history: IhistoryNode) {
        try {
            await this.historyMode.create(history);
        } catch (error) {
            
        }
    }
    async getHistoryStatus() {
        try {
            return await this.historyMode.find();
        } catch (error) {

        }
    }
}
