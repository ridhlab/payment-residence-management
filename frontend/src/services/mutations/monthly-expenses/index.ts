import {
    IMonthlyExpenseStoreRequest,
    IMonthlyExpenseUpdateRequest,
} from "@/interfaces/requests/monthly-expenses";
import { IBaseResponse } from "@/interfaces/responses/base";
import {
    monthlyExpenseStore,
    monthlyExpenseUpdate,
} from "@/services/apis/monthly-expenses";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useMonthlyExpenseMutationStore = (
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IMonthlyExpenseStoreRequest
    >
) => {
    return useMutation({
        mutationKey: ["monthly-expense-store"],
        mutationFn: (payload) => monthlyExpenseStore(payload),
        ...options,
    });
};

export const useMonthlyExpenseMutationUpdate = (
    id,
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IMonthlyExpenseUpdateRequest
    >
) => {
    return useMutation({
        mutationKey: ["monthly-expense-update"],
        mutationFn: (payload) => monthlyExpenseUpdate(id, payload),
        ...options,
    });
};
