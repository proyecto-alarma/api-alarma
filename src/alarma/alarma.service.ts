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

@Injectable()
export class AlarmaService {

  constructor(
    @InjectModel(Alarma.name)
    private readonly alarmaModel:Model<Alarma>,
    private readonly colService:ColaboradoresService,
    private readonly sendMail:SendMailService

  ){}
  async create(createAlarmaDto: CreateAlarmaDto) {
    let getCollabortors;
    //se tiene la lista de coaboradores en caso de que haya intruso
    if(createAlarmaDto.status==SupervisionEnum.INTRUSO ){
      getCollabortors = await this.colService.findAll();
        
    }
 
    //se detecta intruso  es tando la alarma activa
    if(createAlarmaDto.status==SupervisionEnum.INTRUSO  && createAlarmaDto.mode== ModeEnum.ACTIVO ){
      //notificar que existe un intrusos
      getCollabortors.forEach( element => {
          console.log(element.email,111);
       this.sendMail.create(element.email,"Ups, se ha activado la alarma!!!. Posible intruso...");

          
      });
      
    }
    //intruso con modo desactivado
    if(createAlarmaDto.status==SupervisionEnum.INTRUSO  && createAlarmaDto.mode== ModeEnum.NOACTIVO ){
      //validar la hora, puede que este desactivado porque este en horario de oficina,
      //validar el horario de oficina, si ya no se esta en horario laboral y la alarma esta en modo inactivo y el detect intruso. notificas
    }
   try {
    await  this.alarmaModel.create(createAlarmaDto)
    return new ResponseBase("201", "Registro creado con éxito.", {});
   } catch (error) {
    return new ResponseBase("500", "No fue posible crear el registro.", {});   }
  }

  findAll() {
    return `This action returns all alarma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alarma`;
  }

  update(id: number, updateAlarmaDto: UpdateAlarmaDto) {
    return `This action updates a #${id} alarma`;
  }

  remove(id: number) {
    return `This action removes a #${id} alarma`;
  }
}
