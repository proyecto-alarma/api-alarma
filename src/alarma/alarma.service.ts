import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseBase } from 'src/common/model/response-base.model';
import { ModeEnum } from 'src/common/utils/enums/mode.enum';
import { SupervisionEnum } from 'src/common/utils/enums/status.enum';
import { SendMailService } from 'src/send-mail/send-mail.service';
import { CreateAlarmaDto } from './dto/create-alarma.dto';
import { Alarma } from './entities/alarma.entity';
import { ModeService } from 'src/mode/mode.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AlarmaService {

  constructor(
    @InjectModel(Alarma.name)
    private readonly alarmaModel:Model<Alarma>,
    private readonly sendMail:SendMailService,
    private readonly modeService:ModeService,
    private readonly userService:UserService,


  ){}
  async create(createAlarmaDto: CreateAlarmaDto) {
console.log(createAlarmaDto);


     
   try {
    let mode = await this.modeService.findMode();

    if(mode[0].mode===ModeEnum.ACTIVO && createAlarmaDto.status==SupervisionEnum.INTRUSO){
      
      await this.alarmaModel.create(createAlarmaDto);
      let users = await this.userService.finUsers();
      users.forEach( (element: { email: string; token:string; }) => {
        this.sendMail.create(element.email,"Ups, se ha activado la alarma!!!. Posible intruso...", element.token);          
       });  
    }
    return new ResponseBase("201", "Registro creado con éxito.", {});
   } catch (error) { 
    console.log(error);
    
    return new ResponseBase("500", "No fue posible crear el registro.", {});   }
  }

}
