import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,now } from "mongoose";
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

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);

