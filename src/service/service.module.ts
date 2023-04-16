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
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { SeedService } from './seed.service';
import { User, UserSchema } from 'src/commons/schema/user.schema';
import { CredentialSchema, Credential } from 'src/commons/schema/credential.schema';
import { EventService } from './event.service';
import { SendEmailService } from './send-email.service';
import { JwtServices } from './jwt.service';
import { ConfigurationModule } from 'src/commons/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
      {
        name: User.name,
        schema: UserSchema,
        collection: 'coll_user',
      },
      {
        name: Credential.name,
        schema: CredentialSchema,
        collection: 'coll_credential',
      },
    ]),
    JwtModule.register({
      secret: process.env.keyjwt,
      privateKey: process.env.keyjwt2,
      signOptions: { expiresIn: '3d', },
    })
  ],
  providers: [HistoryStatusService, HistoryModeService, ModeService, StatusService, UserService, AuthService, SeedService, EventService, SendEmailService, JwtServices,

  ],
  exports: [HistoryStatusService, HistoryModeService, ModeService, StatusService, UserService, AuthService,],
})
export class ServiceModule { }
