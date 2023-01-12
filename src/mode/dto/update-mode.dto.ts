import { SupervisionEnum } from 'src/common/utils/enums/status.enum';
import { IsEnum } from 'class-validator';
import { ModeEnum } from 'src/common/utils/enums/mode.enum';

export class UpdateModeDto  {
    


    @IsEnum(ModeEnum)
    mode:ModeEnum;
}
