import { IsEnum } from "class-validator";
import { SupervisionEnum } from "src/common/utils/enums/status.enum";
import { ModeEnum } from '../../common/utils/enums/mode.enum';

export class CreateModeDto {
    @IsEnum(ModeEnum)
    mode:ModeEnum;
}
