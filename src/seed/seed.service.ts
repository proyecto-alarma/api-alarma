import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ModeService } from '../mode/mode.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly userService:UserService,
    private readonly modeService:ModeService,
  ){}

  async  findAll() {

try {
  await this.modeService.seed();
await this.userService.seed();
    return {
      code: "200",
      msg:"Seed cargado con éxito",
      body:{}
    };
} catch (error) {
  
}
  }

}
