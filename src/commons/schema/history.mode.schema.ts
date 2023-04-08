import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StatusEnum } from "../enum/status.enum";
import { IhistoryStatus } from "../interface/history.status.interface";
import { IhistoryNode } from "../interface/history.mode.interface";
import { ModoEnum } from "../enum/modo.enum";

@Schema({
    timestamps: { createdAt: 'registrationDate', updatedAt: true },
    toJSON: {
        getters: true,
    },
})

export class HistoryMode implements IhistoryNode {

    @Prop({ enum: ModoEnum, type: String, })
    currentMode: ModoEnum;


    @Prop({ enum: ModoEnum, type: String, })
    lastMode: ModoEnum;


    @Prop({ type: Date })
    date: Date;
}
export const HistoryModeSchema =
    SchemaFactory.createForClass(HistoryMode);

