import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import { ResponseBase } from 'src/common/model/response-base.model';
import { UserService } from '../user/user.service';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly userservice: UserService,
    private readonly configurationService: ConfigurationService,
  ) { }
  async register(createAuthDto: CreateAuthDto) {
    try {
      let result = await this.authModel.create(createAuthDto);

      return new ResponseBase('201', 'Registro exitoso', result);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(new ResponseBase('200', 'Ya existe un usuario con este email', error.keyValue))
      }
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    try {
      let findCredentdial = await this.authModel.findOne({ ...createAuthDto });
      if (!findCredentdial) {
        //en caso de que no exista
        return new ResponseBase('200', 'No se encontro información con estas credenciales.', {});
      }
      let findUSer = await this.userservice.findOne(findCredentdial.id);
      let token = this.configurationService.create({
        id: findCredentdial.id,
        email: findUSer.email,
        role: findUSer.role,
        changePassword: findCredentdial.password === process.env.PASS_DEFAULT
      });
      let createSessionDto = {
        token: token["access_token"],
      };
      return new ResponseBase('201', 'Login exitoso', createSessionDto);
    } catch (error) {
    }
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    try {
      await this.authModel.findByIdAndUpdate({ _id: id }, { ...updateAuthDto })
      return new ResponseBase('200', 'Actualización exitosa.', {});
    } catch (error) {
      return new ResponseBase('400', 'ha ocurrido algo inesperado', {});
    }
  }
  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
