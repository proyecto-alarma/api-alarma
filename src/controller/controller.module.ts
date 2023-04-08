import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { ModeController } from './mode.controller';
import { HistoryModeController } from './history-mode.controller';
import { HistoryStatusController } from './history-status.controller';
import { ServiceModule } from 'src/service/service.module';

@Module({
  controllers: [StatusController, ModeController, HistoryModeController, HistoryStatusController],
  imports:[ServiceModule,]
})
export class ControllerModule {}
