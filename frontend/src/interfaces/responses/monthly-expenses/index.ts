import { IMonthlyExpense } from "@/interfaces/entities/monthly-expenses";
import { IBaseResponse } from "../base";

export interface IMonthlyExpenseIndexResponse
    extends IBaseResponse<IMonthlyExpense[]> {}
export interface IMonthlyExpenseDefaultValueForFormResponse
    extends IBaseResponse<
        Pick<IMonthlyExpense, "name" | "fee" | "isPaidMonthly">
    > {}

export interface IMonthlyExpenseByIsPaidOrNotPaidData {
    id: number;
    name: string;
    fee: number;
    isPaidMonthly: boolean;
}

export interface IMonthlyExpenseByIsPaidOrNotPaidResponse
    extends IBaseResponse<IMonthlyExpenseByIsPaidOrNotPaidData[]> {}
