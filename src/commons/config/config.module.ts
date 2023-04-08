import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validate } from './env.valitation';
import config from './config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
            isGlobal: true,
            cache: true,
            load: [config],
            expandVariables: true,
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL),
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

    ],
})
export class ConfigurationModule { }
