import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StatusEnum } from "../enum/status.enum";
import { IhistoryStatus } from "../interface/history.status.interface";

@Schema({
    timestamps: { createdAt: 'registrationDate', updatedAt: true },
    toJSON: {
        getters: true,
    },
})

export class HistoryStatus implements IhistoryStatus {

    @Prop({ enum: StatusEnum, type: String, })
    currentStatus: StatusEnum;

    @Prop({ enum: StatusEnum, type: String, })
    lastStatus: StatusEnum;

    @Prop({ type: Date })
    date: Date;
}
export const HistoryStatusSchema =
    SchemaFactory.createForClass(HistoryStatus);

