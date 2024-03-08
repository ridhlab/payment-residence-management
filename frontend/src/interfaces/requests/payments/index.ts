import { PaymentType } from "@/enums/payment-type";

export interface IPaymentRequestData {
    type: PaymentType;
    monthlyFeeId?: number;
    monthlyExpenseId?: number;
    numberOfMonths: number;
}

export interface IAddPaymentRequest {
    houseOccupantId: number;
    payments: IPaymentRequestData[];
}
