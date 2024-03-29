export interface IPaymentRequestData {
    monthlyFeeId?: number;
    monthlyExpenseId?: number;
    numberOfMonths: number;
}

export interface IAddPaymentRequest {
    houseOccupantId: number;
    payments: IPaymentRequestData[];
}
