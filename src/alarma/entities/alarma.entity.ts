import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from 'mongoose';
import { ModeEnum } from "src/common/utils/enums/mode.enum";
import { SupervisionEnum } from "src/common/utils/enums/status.enum";

@Schema()
export class Alarma extends Document{
    @Prop()
    status:SupervisionEnum;

    @Prop()
    mode:ModeEnum;

    @Prop()
    detail:string;

    @Prop()
    dateUpd:Date;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;

}

export const AlarmaSchema = SchemaFactory.createForClass(Alarma);
