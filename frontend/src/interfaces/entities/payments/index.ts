import { IBaseEntity } from "../base";

export interface IPayment extends IBaseEntity {
    numberOfMonths: number;
    monthlyFeeId: number;
    occupantPaymentId: number;
}
