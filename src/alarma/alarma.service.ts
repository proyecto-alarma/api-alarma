import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ColaboradoresService } from 'src/colaboradores/colaboradores.service';
import { Colaboradore } from 'src/colaboradores/entities/colaboradore.entity';
import { ResponseBase } from 'src/common/model/response-base.model';
import { ModeEnum } from 'src/common/utils/enums/mode.enum';
import { SupervisionEnum } from 'src/common/utils/enums/status.enum';
import { CreateAlarmaDto } from './dto/create-alarma.dto';
import { UpdateAlarmaDto } from './dto/update-alarma.dto';
import { Alarma } from './entities/alarma.entity';

@Injectable()
export class AlarmaService {

  constructor(
    @InjectModel(Alarma.name)
    private readonly alarmaModel:Model<Alarma>,
    private readonly colService:ColaboradoresService

  ){}
  async create(createAlarmaDto: CreateAlarmaDto) {

    //se tiene la lista de coaboradores en caso de que haya intruso
    if(createAlarmaDto.status==SupervisionEnum.INTRUSO ){
        let getCollabortors = await this.colService.findAll();

        console.log(getCollabortors);
        
    }
 
    //se detecta intruso  es tando la alarma activa
    if(createAlarmaDto.status==SupervisionEnum.INTRUSO  && createAlarmaDto.mode== ModeEnum.ACTIVO ){
      //notificar que existe un intrusos
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
