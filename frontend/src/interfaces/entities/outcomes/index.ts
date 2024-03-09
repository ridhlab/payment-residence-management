import { IBaseEntity } from "../base";

export interface IOutcome extends IBaseEntity {
    name: string;
    fee: number;
}
