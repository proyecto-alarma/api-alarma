import { Module } from '@nestjs/common';
import { HistoryStatusService } from './history-status.service';
import { HistoryModeService } from './history-mode.service';
import { ModeService } from './mode.service';
import { StatusService } from './status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Status, StatusSchema } from 'src/commons/schema/status.schema';
import { Mode, ModeSchema } from 'src/commons/schema/mode.schema';
import { HistoryMode, HistoryModeSchema } from 'src/commons/schema/history.mode.schema';
import { HistoryStatus, HistoryStatusSchema } from 'src/commons/schema/history.status.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Status.name,
        schema: StatusSchema,
        collection: 'coll_status',
      },
      {
        name: Mode.name,
        schema: ModeSchema,
        collection: 'coll_mode',
      },
      {
        name: HistoryMode.name,
        schema: HistoryModeSchema,
        collection: 'coll_history_mode',
      },
      {
        name: HistoryStatus.name,
        schema: HistoryStatusSchema,
        collection: 'coll_history_status',
      },
    ])
  ],
  providers: [HistoryStatusService, HistoryModeService, ModeService, StatusService],
  exports: [HistoryStatusService, HistoryModeService, ModeService, StatusService],
})
export class ServiceModule {}
