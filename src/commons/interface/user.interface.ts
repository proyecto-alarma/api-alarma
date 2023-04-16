import { RoleEnum } from "../enum/role.enum";

export interface Iuser {
    name: string;
    lastName: string;
    phoneNumber: string;
    role: RoleEnum;
    email: string;
    status: string;
    tokenDevice?:string;
}