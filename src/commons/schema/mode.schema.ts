import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ModoEnum } from "../enum/modo.enum";
import { Imodo } from "../interface/modo.interface";

@Schema({
    timestamps: { createdAt: 'registrationDate', updatedAt: true },
    toJSON: {
        getters: true,
    },
})
export class Mode implements Imodo {


    @Prop({ enum: ModoEnum, type: String, required:true })
    modo: ModoEnum;
    
} 

export const ModeSchema =
    SchemaFactory.createForClass(Mode);

