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
