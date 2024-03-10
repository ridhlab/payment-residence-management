import { IBaseResponse } from "../base";

export interface IPaymentByHouseOccupantData {
    id: number;
    paymentDate: string;
    paymentName: string;
    paymentForDate: string;
    fee: number;
}

export interface IPaymentByHouseOccupantResponse
    extends IBaseResponse<IPaymentByHouseOccupantData[]> {}

export interface IPaymentNotOrPaid {
    id: number;
    name: string;
    fee: number;
    paymentDate?: string;
    lastPaidMonth: string | null;
}
export interface IPaymentNotOrPaidResponse
    extends IBaseResponse<IPaymentNotOrPaid[]> {}
