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
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SeedModule } from './seed/seed.module';


AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAWEYLBAIEGD2HQ3OH",
  secretAccessKey: "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",
},);
@Module({ 
  imports: [AlarmaModule,
    ColaboradoresModule,
    SendMailModule,
    ConfigModule.forRoot({envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.URI_DATABASE),
    // MongooseModule.forRoot(process.env.URI_LOCAL),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.USER_ID,
          pass: process.env.PASS_USSER_ID,
        }
      }
    },),
    ModeModule,
    AuthModule,
    UserModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
