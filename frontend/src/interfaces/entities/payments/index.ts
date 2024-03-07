import { PaymentType } from "@/enums/payment-type";
import { IBaseEntity } from "../base";

export interface IPayment extends IBaseEntity {
    type: PaymentType;
    numberOfMonths: number;
    monthlyExpenseId: number;
    monthlyFeeId: number;
    occupantPaymentId: number;
}
