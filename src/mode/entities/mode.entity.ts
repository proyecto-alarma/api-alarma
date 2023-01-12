import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { SupervisionEnum } from '../../common/utils/enums/status.enum';
import { ModeEnum } from "src/common/utils/enums/mode.enum";

@Schema()
export class Mode extends Document{

@Prop()
status:SupervisionEnum;

@Prop()
mode:ModeEnum;

}

export const ModeSchema = SchemaFactory.createForClass(Mode);

