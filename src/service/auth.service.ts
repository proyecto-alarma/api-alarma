import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseBase } from 'src/common/model/response-base.model';
import { Icredential } from 'src/commons/interface/credential.interface';
import { Credential } from 'src/commons/schema/credential.schema';
import { JwtServices } from './jwt.service';
import { log } from 'console';
import { User } from 'src/commons/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Credential.name)
        private readonly crendentialModel: Model<Credential>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwt: JwtServices,
    ) { }

    async createCredential(icredential: Icredential) {
        try {
            await this.crendentialModel.create(icredential);
        } catch (error) {

        }
    }
    async login(icredential: Icredential) {
        try {
            let findUser = await this.crendentialModel.findOne({ email: icredential.email });

            if (!findUser) throw new BadRequestException();
    
            if (findUser.password !== icredential.password) throw new BadRequestException();
            if(this.isupdatepassword(icredential))return new ResponseBase("UPDATE_PASSWORD", 'Por favor actualice contraseña', {  })

            let token = await this.jwt.create({
                id: findUser.userId.toString()
            })

                   await this.userModel.findOneAndUpdate({email:icredential.email},{tokenDevice:icredential.tokenDevice})
            return new ResponseBase("OK", 'Login exitoso', { token })
        } catch (e) {

            if (e.status === 400) throw new BadRequestException('No existe usuario con estas credenciales');

            throw new BadRequestException(e.message);
        }
    }
    private isupdatepassword(icredential: Icredential):boolean {
        console.log(icredential.password === process.env.PASS_DEFAULT, 123);
        
        if (icredential.password === process.env.PASS_DEFAULT) return  true;
        return false; 
    }

   async updatePassword(icredential: Icredential){

        try {
            let findUser = await this.crendentialModel.findOne({ email: icredential.email });
            if(!findUser) throw new BadRequestException();

            await this.crendentialModel.updateOne({email:icredential.email},{password:icredential.password});
            return new ResponseBase("OK", 'Actualización exitosa',)
        } catch (e) {
            if (e.status === 400) throw new BadRequestException('No existe usuario con este email');
        }
    }
}
