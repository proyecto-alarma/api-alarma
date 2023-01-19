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
import { RoleEnum } from '../common/utils/enums/role.enum';

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
        let r = await this.authModel.create({ email: createUserDto.email, password: process.env.PASS_DEFAULT });

        await this.userModel.create({ ...createUserDto, uid: r.id });
        return new ResponseBase('201', 'Usuario creado con éxito', {});
      }
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        throw new BadRequestException(new ResponseBase('200', 'Ya existe un usuario con este email', error.keyValue))
      }
    }
  }

  async findAll(role: string) {
    return new ResponseBase('200', 'Solicitud exitosa', await this.userModel.find({ role }));
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

      return new BadRequestException('400', 'no se pudo actualizar el usuario.');
    }
  }



  //para pre cargar datos
  async seed() {

    let findUser = await this.userModel.find({ role: "ADMIN" });
    try {

      if (findUser.length > 0) {

        return new ResponseBase('200', 'ya existe un administrador.', {});
      }
      let r = await this.authModel.create({ email: "ar2224518@gmail.com", password: process.env.PASS_DEFAULT });

      await this.userModel.create({ name: "Andres Ruiz", email: "ar2224518@gmail.com", uid: r.id, role:RoleEnum.ADMIN});
      return new ResponseBase('201', 'Usuario creado con éxito', {});

    } catch (error) {
      return new ResponseBase('400', 'Error al crear usuario.', {});

    }


  }
}
