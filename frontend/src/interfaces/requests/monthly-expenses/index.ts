export interface IMonthlyExpenseStoreRequest {
    name: string;
    fee: number;
    isPaidMonthly: boolean;
}

export interface IMonthlyExpenseUpdateRequest {
    name: string;
    fee: number;
    isPaidMonthly: boolean;
}
