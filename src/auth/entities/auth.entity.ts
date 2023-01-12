import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Auth  extends Document{

    @Prop({unique:true})
    email: string;
    @Prop()
    password: string;

} 


export const AuthSchema = SchemaFactory.createForClass(Auth);
