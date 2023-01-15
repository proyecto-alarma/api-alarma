import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { ResponseBase } from 'src/common/model/response-base.model';
import { ConfigurationService } from '../configuration/configuration.service';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/entities/auth.entity';

@Injectable()
export class UserService {


  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly configurationModel: ConfigurationService,

  ) {
  }
  async create(createUserDto: CreateUserDto, headers: any) {
    try {
      let { token } = headers;
      if (!token) {
        return new ResponseBase('400', 'Falta el token de acceso o no es ', {});
      }
      let decodeToken = await this.configurationModel.decodeToken(token)

      if (decodeToken["role"] === "ADMIN") {
        console.log(createUserDto);
        
        let r =  await this.authModel.create({email:createUserDto.email, password:"123456"});
       
        await this.userModel.create({ ...createUserDto, uid:r.id });
        return new ResponseBase('201', 'Usuario creado con éxito', {});
      }
      console.log("aaaa", decodeToken["role"]);


    } catch (error) {
      console.log(error);
      
      if (error.code === 11000) {
        throw new BadRequestException(new ResponseBase('200', 'Ya existe un usuario con este email', error.keyValue))
      }
    }
  }


  async findAll() {
    return new ResponseBase('200', 'Solicitud exitosa',await this.userModel.find());
  }
  async finUsers() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ uid: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.userModel.findOneAndUpdate({ uid: id }, { ...updateUserDto })
      
      return new ResponseBase('200', 'usuario actualizado con exito', {});
    
    } catch (error) {
      
      return new BadRequestException('400','no se pudo actualizar el usuario.');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
