import { IBaseEntity } from "../base";

export interface IMonthlyFee extends IBaseEntity {
    name: string;
    fee: number;
}
