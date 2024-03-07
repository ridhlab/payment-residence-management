import { IAddHouseOccupantRequest } from "@/interfaces/requests/house-occupants";
import { IBaseResponse } from "@/interfaces/responses/base";
import { addHouseOccupant } from "@/services/apis/house-occupants";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useAddHouseOccupantMutation = (
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IAddHouseOccupantRequest
    >
) => {
    return useMutation({
        mutationKey: ["add-house-occupant"],
        mutationFn: (payload) => addHouseOccupant(payload),
        ...options,
    });
};
