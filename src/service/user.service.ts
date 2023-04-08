import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iuser } from 'src/commons/interface/user.interface';
import { User } from 'src/commons/schema/user.schema';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {


    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly credentialService:AuthService,
    ) { }

 async  createUser(iuser:Iuser){
    try {
        let create = await this.userModel.create(iuser);
        await this.credentialService.createCredential({
            email:iuser.email,
            password:process.env.PASS_DEFAULT,
            userId:create._id.toString(),
        });
    } catch (error) {

    }
  }  
}
