import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { ModeController } from './mode.controller';
import { HistoryModeController } from './history-mode.controller';
import { HistoryStatusController } from './history-status.controller';
import { ServiceModule } from 'src/service/service.module';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { SeedController } from './seed.controller';
import { EventController } from './event.controller';

@Module({
  controllers: [StatusController, ModeController, HistoryModeController, HistoryStatusController, AuthController, UserController, SeedController, EventController],
  imports:[ServiceModule,]
})
export class ControllerModule {}
