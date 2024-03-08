import { IAddHouseOccupantRequest } from "@/interfaces/requests/house-occupants";
import { IBaseResponse } from "@/interfaces/responses/base";
import {
    addHouseOccupant,
    removeHouseOccupant,
} from "@/services/apis/house-occupants";
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

export const useRemoveHouseOccupantMutation = (
    id,
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        null
    >
) => {
    return useMutation({
        mutationKey: ["remove-house-occupant", id],
        mutationFn: () => removeHouseOccupant(id),
        ...options,
    });
};
