import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get('/v1/get-user')
    async getUSer(){

        return await this.userService.getUsers();
    }
    @Get('/v1/get-user/:id')
    async getUSerById(@Param('id') id:string){

        return await this.userService.getUserById(id);
    }
}
