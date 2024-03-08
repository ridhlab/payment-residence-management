import { PaymentType } from "@/enums/payment-type";
import { IBaseResponse } from "../base";

export interface IPaymentByHouseOccupantData {
    id: number;
    paymentDate: string;
    paymentType: PaymentType;
    paymentName: string;
    paymentForDate: string;
    fee: number;
}

export interface IPaymentByHouseOccupantResponse
    extends IBaseResponse<IPaymentByHouseOccupantData[]> {}

export interface IPaymentNotOrPaid {
    id: number;
    type: PaymentType;
    name: string;
    fee: number;
    paymentDate?: string;
}
export interface IPaymentNotOrPaidResponse
    extends IBaseResponse<IPaymentNotOrPaid[]> {}
