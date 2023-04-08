import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
