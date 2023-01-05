import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SNS } from 'aws-sdk';
import { UpdateSendMailDto } from './dto/update-send-mail.dto';
import * as firebase from 'firebase-admin';
export interface ISendFirebaseMessages {
  token: string;
  title?: string;
  message: string;
}
@Injectable()
export class SendMailService {
  private client: AWS.SNS;

  constructor(
    private readonly mailservice: MailerService
  ) {}
  async create(email: string, message: string) {
    try {
      const tokenMessages: firebase.messaging.TokenMessage = {
        notification: { body: message, title: "a", },
        token: "e7-wCyC5RW6l-8Fi4sWkx7:APA91bEs0yuwcjkQ2VfldfQEzZSR3u0nao1W5c0Gw8TkqHKHHV3OYxPJojHxPqpuksOsvuRTq0pHRFIP8IhNaayzTYEXmyMUXlRgKbwtsmVIed3r89tAbf7HMuR0oFqhw3b6zntm_unq",
        apns: {
          payload: {
            aps: {
              'content-available': 1,
            },
          },
        },
      };
   firebase.messaging().send(tokenMessages);
     await this.mailservice.sendMail({
        from: "ar2224518@gmail.com",
        to: email,
        subject: "Alarma activada!!!",
        text: message,
      })
    } catch (error) {
      console.log(error, 222);
    }
    return 'This action adds a new sendMail';
  }
  findAll() {
    return `This action returns all sendMail`;
  }
  findOne(id: number) {
    return `This action returns a #${id} sendMail`;
  }
  update(id: number, updateSendMailDto: UpdateSendMailDto) {
    return `This action updates a #${id} sendMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} sendMail`;
  }
}
