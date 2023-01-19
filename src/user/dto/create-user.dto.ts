import { IsString, IsEmail, IsEnum } from 'class-validator';
import { RoleEnum } from 'src/common/utils/enums/role.enum';
export class CreateUserDto {


    @IsString()
    name?:string;
    
 

    token?:string;



    @IsEmail()
    email?:string;


    @IsEnum(RoleEnum)
    role?:RoleEnum;
}
