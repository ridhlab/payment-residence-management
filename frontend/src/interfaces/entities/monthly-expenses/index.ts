import { IBaseEntity } from "../base";

export interface IMonthlyExpense extends IBaseEntity {
    name: string;
    fee: string;
    isPaidMonthly: boolean;
}
