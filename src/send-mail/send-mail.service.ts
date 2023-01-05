import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateSendMailDto } from './dto/create-send-mail.dto';
import { UpdateSendMailDto } from './dto/update-send-mail.dto';

@Injectable()
export class SendMailService {
  
  constructor(
    private readonly mailservice: MailerService
  ){

  }
async  create(createSendMailDto: CreateSendMailDto) {
try {
  let d= await this.mailservice.sendMail({
    from:"ar2224518@gmail.com",
    to:"amestr367@gmail.com",
    subject:"email simple",
    text:"es un email simpleeee.",
  })
  console.log(d);
  
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
