import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmaModule } from './alarma/alarma.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ColaboradoresModule } from './colaboradores/colaboradores.module';
import { SendMailModule } from './send-mail/send-mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ModeModule } from './mode/mode.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as AWS from 'aws-sdk';


AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAWEYLBAIEGD2HQ3OH",
  secretAccessKey: "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",
});
@Module({ 
  
  imports: [AlarmaModule,
    MongooseModule.forRoot('mongodb+srv://alarm_project_:A9LXbAGXxQPvuRU2@cluster0.iesz9tr.mongodb.net/?retryWrites=true&w=majority'),
    ColaboradoresModule,
    SendMailModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'ar2224518@gmail.com',
          pass: 'akdaaejelvbkirfx',
        }
      }
    },),
    ModeModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
