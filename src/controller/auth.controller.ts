import { Body, Controller, Post } from '@nestjs/common';
import { Icredential } from 'src/commons/interface/credential.interface';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly credentialService:AuthService){}

    @Post('/v1/login')
   async  login(@Body() icredential:Icredential){
        return await this.credentialService.login(icredential);
    }
}
