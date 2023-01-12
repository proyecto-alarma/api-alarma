import { Module } from '@nestjs/common';
import { ModeService } from './mode.service';
import { ModeController } from './mode.controller';
import { CommonModule } from 'src/common/common.module';
import { Mode, ModeSchema } from './entities/mode.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryMode, HistoryModeSchema } from './entities/history-mode.entity';
import { UserModule } from '../user/user.module';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  controllers: [ModeController],
  providers: [ModeService],
  exports: [ModeService],
  imports:[
    CommonModule,
    ConfigurationModule,
    MongooseModule.forFeature([
      {
        name: Mode.name,
        schema: ModeSchema,
      },
      {
        name: HistoryMode.name,
        schema: HistoryModeSchema,
      },
    ]),
  ]
})

export class ModeModule {}
