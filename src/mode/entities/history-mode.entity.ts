import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ModeEnum } from "src/common/utils/enums/mode.enum";
import { SupervisionEnum } from "src/common/utils/enums/status.enum";

@Schema()
export class HistoryMode extends Document{

    @Prop()
    status:SupervisionEnum;
    @Prop()
    mode:ModeEnum;
    @Prop()
    detail:string;
    @Prop()
    uid:string;
    @Prop()
    date:Date;

}
export const HistoryModeSchema = SchemaFactory.createForClass(HistoryMode);
