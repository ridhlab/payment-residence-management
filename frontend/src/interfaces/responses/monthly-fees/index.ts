import { IBaseResponse } from "../base";
import { IMonthlyFee } from "@/interfaces/entities/monthly-fees";

export interface IMonthlyFeeGetAllData {
    id: number;
    name: string;
    fee: number;
}

export interface IMonthlyFeeIndexResponse
    extends IBaseResponse<IMonthlyFee[]> {}
export interface IMonthlyFeeDefaultValueForFormResponse
    extends IBaseResponse<Pick<IMonthlyFee, "name" | "fee">> {}

export interface IMonthlyFeeGetAllResponse
    extends IBaseResponse<IMonthlyFeeGetAllData[]> {}
