import { IBaseResponse } from "../base";
import { IMonthlyFee } from "@/interfaces/entities/monthly-fees";

export interface IMonthlyFeeIndexResponse
    extends IBaseResponse<IMonthlyFee[]> {}
export interface IMonthlyFeeDefaultValueForFormResponse
    extends IBaseResponse<Pick<IMonthlyFee, "name" | "fee">> {}
