import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Iuser } from "../interface/user.interface";

@Schema({
    timestamps: { createdAt: 'registrationDate', updatedAt: true },
    toJSON: {
        getters: true,
    },
})
export class User implements Iuser {

    @Prop()
    name: string;
    @Prop()
    lastName: string;
    @Prop()
    phoneNumber: string;
    @Prop()
    role: string;
    @Prop({unique:true})
    email: string;
}
export const UserSchema =
    SchemaFactory.createForClass(User);

