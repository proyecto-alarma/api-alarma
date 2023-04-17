import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { firebaseAdmin } from 'src/commons/config/firebase-admin.config';

@Injectable()
export class SendEmailService {
    constructor(
        private readonly mailservice: MailerService
    ) { }


    async sendEMail(email: string, message: string) {

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


    async sendNotification(token: string, title: string, body: string, topic: string) {

        const message = {
            notification: {
                title,
                body,
             
            },
            data: {
                topic: topic,
            },
            token,
        };
        console.log(token);

        try {
            const response = await firebaseAdmin.messaging().send(message);
        } catch (error) {
            console.log('Error sending message:', error);
        }
    }
}
