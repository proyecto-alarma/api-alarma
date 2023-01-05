import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString, MinDate } from "class-validator";
import { ModeEnum } from "src/common/utils/enums/mode.enum";
import { SupervisionEnum } from "src/common/utils/enums/status.enum";

export class CreateAlarmaDto {

     
    @IsNotEmpty()
    @IsString()
    @IsEnum(SupervisionEnum)
    status:SupervisionEnum;
     
    @IsNotEmpty()
    @IsString()
    @IsEnum(ModeEnum)
    mode:ModeEnum;


    @IsNotEmpty()
    @IsString()
    detail:string;

    @IsNotEmpty()
    @IsDate()
    @Transform( ({ value }) => value && new Date(value))

    @MinDate(new Date())
    dateUpd:Date;


}
