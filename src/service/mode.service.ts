import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mode } from 'src/commons/schema/mode.schema';
import { HistoryModeService } from './history-mode.service';
import { Imodo } from 'src/commons/interface/modo.interface';
import { Model } from 'mongoose';

@Injectable()
export class ModeService {

    constructor(
        @InjectModel(Mode.name)
        private readonly modeModel: Model<Mode>,
        private readonly historyStatusService: HistoryModeService
    ) { }
    async createStatus(istatus: Imodo) {
        try {
            const lastResult = await this.modeModel.findOne().sort({ $natural: -1 });
            if (!lastResult) {
                await this.modeModel.create(istatus)
            } else {
                await this.modeModel.updateOne(istatus);
            }
            await this.historyStatusService.createHistory({
                currentMode: istatus.modo,
                lastMode: lastResult==null?istatus.modo:lastResult.modo,
                date: new Date()
            });

        } catch (error) {
        }
    }


   async geStatus(){
        try {
            const lastResult = await this.modeModel.findOne().sort({ $natural: -1 });

            return lastResult;

        } catch (error) {
            
        }
    }
}
