import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from 'mongoose';
@Schema()
export class Auth  extends Document{

    @Prop({unique:true})
    email: string;
    @Prop()
    password: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;

} 


export const AuthSchema = SchemaFactory.createForClass(Auth);
