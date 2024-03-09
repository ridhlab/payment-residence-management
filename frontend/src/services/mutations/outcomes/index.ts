import { IAddOutcomeRequest } from "@/interfaces/requests/outcomes";
import { IBaseResponse } from "@/interfaces/responses/base";
import { addOutcome } from "@/services/apis/outcomes";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useAddOutcomeMutations = (
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IAddOutcomeRequest
    >
) => {
    return useMutation({
        mutationKey: ["add-outcomes"],
        mutationFn: (payload) => addOutcome(payload),
        ...options,
    });
};
