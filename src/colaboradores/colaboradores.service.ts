import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseBase } from 'src/common/model/response-base.model';
import { CreateColaboradoreDto } from './dto/create-colaboradore.dto';
import { UpdateColaboradoreDto } from './dto/update-colaboradore.dto';
import { Colaboradore } from './entities/colaboradore.entity';

@Injectable()
export class ColaboradoresService {
  constructor(
    @InjectModel(Colaboradore.name)
    private readonly colModel:Model<Colaboradore>
  ){}

  //crea los colaboradores
  async create(createColaboradoreDto: CreateColaboradoreDto) {
      try {
        await this.colModel.create({...createColaboradoreDto,role:"COLLABORATOR"});
    return new ResponseBase("201", "Colaborador creado con éxito.", {});
      } catch (error) { 
        if(error.code===11000){
            throw new BadRequestException(new ResponseBase('200', 'Ya existe un usuario con este email', error.keyValue))
        }
           
      }
  } 


  async findAll() {
    return await this.colModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} colaboradore`;
  }

  update(id: number, updateColaboradoreDto: UpdateColaboradoreDto) {
    return `This action updates a #${id} colaboradore`;
  }

  remove(id: number) {
    return `This action removes a #${id} colaboradore`;
  }
}
