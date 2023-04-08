import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Iuser } from "../interface/user.interface";
import { RoleEnum } from "../enum/role.enum";

@Schema({
    timestamps: { createdAt: 'registrationDate', updatedAt: true },
    toJSON: {
        getters: true,
    },
})
export class User implements Iuser {
    @Prop({required:true})
    tokenDevice: string;

    @Prop()
    name: string;

    @Prop()
    lastName: string;
    @Prop()
    phoneNumber: string;

    @Prop({enum:RoleEnum, type:String})
    role: RoleEnum;
    
    @Prop({unique:true})
    email: string;
}
export const UserSchema =
    SchemaFactory.createForClass(User);

