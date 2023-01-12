import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { RoleEnum } from "src/common/utils/enums/role.enum";
@Schema()
export class User  extends Document{

    @Prop()
    name: string;

    
    @Prop()
    token: string;

    @Prop({
        unique: true
    })
    email: string;


    @Prop({
        unique: true
    })
    uid: string;

    @Prop() 
    role: RoleEnum;
}
export const UserSchema = SchemaFactory.createForClass(User);

