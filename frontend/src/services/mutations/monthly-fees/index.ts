import {
    IMonthlyFeeStoreRequest,
    IMonthlyFeeUpdateRequest,
} from "@/interfaces/requests/monthly-fees";
import { IBaseResponse } from "@/interfaces/responses/base";
import {
    monthlyFeeStore,
    monthlyFeeUpdate,
} from "@/services/apis/monthly-fees";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useMonthlyFeeMutationStore = (
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IMonthlyFeeStoreRequest
    >
) => {
    return useMutation({
        mutationKey: ["monthly-fee-store"],
        mutationFn: (payload) => monthlyFeeStore(payload),
        ...options,
    });
};

export const useMonthlyFeeMutationUpdate = (
    id,
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IMonthlyFeeUpdateRequest
    >
) => {
    return useMutation({
        mutationKey: ["monthly-fee-update"],
        mutationFn: (payload) => monthlyFeeUpdate(id, payload),
        ...options,
    });
};
