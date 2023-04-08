import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Icredential } from "../interface/credential.interface";


@Schema({
    timestamps: { createdAt: 'registrationDate', updatedAt: true },
    toJSON: {
        getters: true,
    },
})

export class Credential implements Icredential{

    @Prop({unique:true})
    email: string;
    
    @Prop()
    password: string;
    
    @Prop({unique:true})
    userId: string;
}

export const CredentialSchema =
    SchemaFactory.createForClass(Credential);

