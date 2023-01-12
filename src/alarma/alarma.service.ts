import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ColaboradoresService } from 'src/colaboradores/colaboradores.service';
import { Colaboradore } from 'src/colaboradores/entities/colaboradore.entity';
import { ResponseBase } from 'src/common/model/response-base.model';
import { ModeEnum } from 'src/common/utils/enums/mode.enum';
import { SupervisionEnum } from 'src/common/utils/enums/status.enum';
import { SendMailService } from 'src/send-mail/send-mail.service';
import { CreateAlarmaDto } from './dto/create-alarma.dto';
import { UpdateAlarmaDto } from './dto/update-alarma.dto';
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

    let mode = await this.modeService.findAll();

    console.log(mode, 1232);
    if(mode[0].mode===ModeEnum.ACTIVO){
      
      let users = await this.userService.findAll();
      console.log(users, 312432);
      users.forEach( (element: { email: string; token:string; }) => {
        this.sendMail.create(element.email,"Ups, se ha activado la alarma!!!. Posible intruso...", element.token);          
       });
      
    }
    
    let getCollabortors;
    //se tiene la lista de coaboradores en caso de que haya intruso
    // if(createAlarmaDto.status==SupervisionEnum.INTRUSO ){
    //   getCollabortors = await this.colService.findAll();        
    // }

    // //se detecta intruso  es tando la alarma activa
    // if(createAlarmaDto.status==SupervisionEnum.INTRUSO  && createAlarmaDto.mode== ModeEnum.ACTIVO ){
    //   //notificar que existe un intrusos
    
    // }

   try {
    // await  this.alarmaModel.create(createAlarmaDto)
    return new ResponseBase("201", "Registro creado con éxito.", {});
   } catch (error) {
    return new ResponseBase("500", "No fue posible crear el registro.", {});   }
  }

}
