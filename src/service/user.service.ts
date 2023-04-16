import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Iuser } from 'src/commons/interface/user.interface';
import { User } from 'src/commons/schema/user.schema';
import { AuthService } from './auth.service';
import { ResponseBase } from 'src/common/model/response-base.model';
import { RoleEnum } from 'src/commons/enum/role.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly credentialService: AuthService,
    ) { }
    async createUser(iuser: Iuser) {
        let findAdmin: Document<unknown, any, User> & User & { _id: Types.ObjectId; };
        try {
            if (iuser.role == "ADMIN") findAdmin = await this.userModel.findOne({ role: iuser.role });
            if (findAdmin) throw new BadRequestException();

            let create = await this.userModel.create(iuser);
            await this.credentialService.createCredential({
                email: iuser.email,
                password: process.env.PASS_DEFAULT,
                userId: create._id.toString(),
            });
            return new ResponseBase('OK', 'Usuario creado con éxito', {})
        } catch (e) {
            if (e.code === 11000) {
                throw new BadRequestException("Ya existe un usuario con este email");
            }
            if (e.status === 400) {
                throw new BadRequestException("Ya existe un usuario con rol de administrador");
            }
            throw new BadRequestException(e.message);
        }
    }


    async getUsers(){


        try {
            let result = await this.userModel.find({role:RoleEnum.COLLABORATOR});
            return  new ResponseBase('OK', 'Consulta exitosa', result); 
        } catch (error) {
            
        }
    }
    async getUsers2(){


        try {
            return  this.userModel.find(); 
        } catch (error) {
            
        }
    }

    async getUserById(id:string){
        let result = await this.userModel.findById({_id:id});
        return  new ResponseBase('OK', 'Consulta exitosa', result); 
    }
}
