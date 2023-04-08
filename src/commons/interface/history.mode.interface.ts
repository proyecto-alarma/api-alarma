import { ModoEnum } from "../enum/modo.enum";

export interface IhistoryNode {
    currentMode: ModoEnum;
    lastMode: ModoEnum;
    date: Date
}