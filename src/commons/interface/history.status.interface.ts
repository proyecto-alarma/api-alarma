import { ModoEnum } from "../enum/modo.enum";
import { StatusEnum } from "../enum/status.enum";

export interface IhistoryStatus {
    currentStatus: StatusEnum;
    lastStatus: StatusEnum;
    date: Date

}