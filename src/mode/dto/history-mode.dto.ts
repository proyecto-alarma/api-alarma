import { IsDate, IsEnum, IsString } from "class-validator";
import { SupervisionEnum } from '../../common/utils/enums/status.enum';
import { ModeEnum } from '../../common/utils/enums/mode.enum';

export class HistoryModeDto{


    @IsEnum(ModeEnum)
    mode:ModeEnum;
   
    @IsString()
    detail:string;

    @IsString()
    uid:string;

    @IsDate()
    date:Date;

    

}