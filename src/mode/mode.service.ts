import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateModeDto } from './dto/create-mode.dto';
import { UpdateModeDto } from './dto/update-mode.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mode } from './entities/mode.entity';
import { Model } from 'mongoose';
import { throws } from 'assert';
import { ResponseBase } from '../common/model/response-base.model';
import { HistoryMode } from './entities/history-mode.entity';
import { ConfigurationService } from '../configuration/configuration.service';
import { HistoryModeDto } from './dto/history-mode.dto';

@Injectable()
export class ModeService {

  constructor(
    @InjectModel(Mode.name)
    private readonly modeModel: Model<Mode>,
    @InjectModel(HistoryMode.name)
    private readonly historModel: Model<HistoryMode>,
    private readonly configurationModel: ConfigurationService,
  ) {
  }
  async create(createModeDto: CreateModeDto, headers: any) {
    try {
      let { token } = headers;
      if (!token) {
        return new BadRequestException({}, "Falta el token");
      }
      let getModes = await this.modeModel.find();
      //si existe actualiza
      if (getModes.length > 0) {

      } else {
        //sino existe crea
        await this.modeModel.create({ ...createModeDto });
      }
      return new ResponseBase('201', 'Solicitud exitosa', {});
    } catch (error) {
      console.log(error);
    }
  }

  //se obtiene el modo actual
  async findAll() {
    let get = await this.modeModel.find();

    return new ResponseBase('200', 'Consulta éxitosa', get);
  }

  //se obtiene el modo actual, pero no se responde con el formato de respuesta 
  async findMode() {
    let get = await this.modeModel.find();
    return get;
  }



  async getHistoeyMode() {
 
  }

  async update(updateModeDto: UpdateModeDto, headers: any) {
    let { token } = headers;
    if (!token) {

      return new BadRequestException({}, "Falta el token");
    }
    let getModes = await this.modeModel.find();
    if (getModes.length > 0) {
      let decodeToken = await this.configurationModel.decodeToken(token);

      await this.modeModel.findByIdAndUpdate({ _id: getModes[0].id }, { ...updateModeDto });
      const hmsa: HistoryModeDto = {
        date: new Date(),
        detail: "Cambio de estado de la alarma",
        mode: updateModeDto.mode,
        uid: decodeToken["id"]
      }
      await this.historModel.create(hmsa);
      return new ResponseBase('200', 'Solicitud exitosa', {});
    }
  }

  remove(id: number) {
    return `This action removes a #${id} mode`;
  }
}
