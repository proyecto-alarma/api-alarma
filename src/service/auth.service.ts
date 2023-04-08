import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseBase } from 'src/common/model/response-base.model';
import { Icredential } from 'src/commons/interface/credential.interface';
import { Credential } from 'src/commons/schema/credential.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Credential.name)
        private readonly crendentialModel: Model<Credential>,
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

            return new ResponseBase("200", 'Login exitoso', {})
        } catch (e) {

            if (e.status === 400) throw new BadRequestException('No existe usuario con estas credenciales');

            throw new BadRequestException(e.message);
        }
    }
}
