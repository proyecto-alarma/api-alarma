import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { StatusEnum } from "../enum/status.enum";
import { Istatus } from "../interface/status.interface";

@Schema({
    timestamps: { createdAt: 'registrationDate', updatedAt: true, },
    toJSON: {
        getters: true,
    },
})
export class Status implements Istatus {

    @Prop({ enum: StatusEnum, type: String, })
    status: StatusEnum;
}

export const StatusSchema =
    SchemaFactory.createForClass(Status);

