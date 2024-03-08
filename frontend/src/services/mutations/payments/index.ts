import { IAddPaymentRequest } from "@/interfaces/requests/payments";
import { IBaseResponse } from "@/interfaces/responses/base";
import { addPayments } from "@/services/apis/payments";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useAddPaymentsMutations = (
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IAddPaymentRequest
    >
) => {
    return useMutation({
        mutationKey: ["add-payments"],
        mutationFn: (payload) => addPayments(payload),
        ...options,
    });
};
