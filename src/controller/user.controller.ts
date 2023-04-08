import { Body, Controller, Post } from '@nestjs/common';
import { Iuser } from 'src/commons/interface/user.interface';
import { UserService } from 'src/service/user.service';

@Controller('user')
export class UserController {


    constructor(
        private readonly userService: UserService
    ) { }

    @Post('/v1/create-user')
    async createUser(@Body() iuser: Iuser) {
        return await this.userService.createUser(iuser);
    }
}
