import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
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
  ) { }
  async create(email: string, message: string, token:string) {
    try {      

      console.log(token);
      console.log(new Date());

       
      
      const tokenMessages: firebase.messaging.TokenMessage = {
        notification: { body: message, title: "a", },
        token: token,
        apns: { 
          payload: {
            aps: {
              'content-available': 1,
              sound: "alarma",
              _channel_id: "ARoSistemas", 
            },

          },
        },
      };
      firebase.messaging().send(tokenMessages);
      if(email!="ar2224518@gmail.com"){
        await this.mailservice.sendMail({
          from: "ar2224518@gmail.com",
          to: email,
          subject: "Alarma activada!!!",
          text: message,
          
        })
      }
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
