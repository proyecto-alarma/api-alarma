import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseBase } from 'src/common/model/response-base.model';

@Injectable()
export class ConfigurationService {
  constructor(
    private jwtService: JwtService,

  ) {

  }


  create(createConfigurationDto: any) {
    const payload = { ...createConfigurationDto};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async decodeToken(token:string) {


    try {
      let  d =  await this.jwtService.verify(token, {
        secret: '43vcdsvr4565756',
      });
      return d;
    } catch (error) {
      console.log("aaaaa");
      
      return new ResponseBase('400', 'token no valido.', {});
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} configuration`;
  }

  update(id: number, updateConfigurationDto: UpdateConfigurationDto) {
    return `This action updates a #${id} configuration`;
  }

  remove(id: number) {
    return `This action removes a #${id} configuration`;
  }
}
