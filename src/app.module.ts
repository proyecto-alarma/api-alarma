import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { CommonsModule } from './commons/commons.module';
import { ControllerModule } from './controller/controller.module';



@Module({
  imports: [
    CommonsModule,
    ControllerModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
