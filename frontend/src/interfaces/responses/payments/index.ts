import { PaymentType } from "@/enums/payment-type";
import { IBaseResponse } from "../base";

export interface IPaymentByHouseOccupantData {
    id: number;
    paymentDate: string;
    paymentType: PaymentType;
    paymentName: string;
    paymentForDate: string;
}

export interface IPaymentByHouseOccupantResponse
    extends IBaseResponse<IPaymentByHouseOccupantData[]> {}
