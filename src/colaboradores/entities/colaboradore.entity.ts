import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Colaboradore extends Document {
    @Prop({
        unique:true,
    })
    email:string;

    @Prop()
    name:string;

    @Prop()
    phone:string;
}
export const ColaboradoreSchema = SchemaFactory.createForClass(Colaboradore);
