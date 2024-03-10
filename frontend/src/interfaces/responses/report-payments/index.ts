import { IBaseResponse } from "../base";

export interface IReportIncomesData {
    id: number;
    houseCode: string;
    occupant: string;
    paymentDate: string;
    paymentForDate: string;
    fee: number;
    paymentName: string;
}
export interface IReportIncomesResponse
    extends IBaseResponse<IReportIncomesData[]> {}

export interface IReportOutcomesData {
    id: number;
    name: string;
    date: string;
    fee: string;
}
export interface IReportOutcomesResponse
    extends IBaseResponse<IReportOutcomesData[]> {}

export interface IReportPaymentForYearData {
    year: number;
    month: number;
    totalIncomes: number;
    totalOutcomes: number;
    balance: number;
}

export interface IReportPaymentForYearResponse
    extends IBaseResponse<IReportPaymentForYearData[]> {}

export interface IReportBalanceAllTimeData {
    balance: number;
    totalIncomes: number;
    totalOutcomes: number;
}

export interface IReportBalanceAllTimeResponse
    extends IBaseResponse<IReportBalanceAllTimeData> {}
