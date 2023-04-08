import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailService {
    constructor(
        private readonly mailservice: MailerService
      ) { }


   async sendEMail(email:string, message:string){

    try {
        await this.mailservice.sendMail({
            from: process.env.USER_ID,
            to: email,
            subject: "Alarma activada!!!",
            text: message,
        })
    } catch (e) {
        console.log(e);
        
    }
   }  
}
 