import {
    IOccupantStoreRequest,
    IOccupantUpdateRequest,
} from "@/interfaces/requests/occupants";
import { IBaseResponse } from "@/interfaces/responses/base";
import { occupantStore, occupantUpdate } from "@/services/apis/occupants";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useOccupantMutationStore = (
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IOccupantStoreRequest
    >
) => {
    return useMutation({
        mutationKey: ["occupant-store"],
        mutationFn: (payload) => occupantStore(payload),
        ...options,
    });
};

export const useOccupantMutationUpdate = (
    id,
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IOccupantUpdateRequest
    >
) => {
    return useMutation({
        mutationKey: ["occupant-update"],
        mutationFn: (payload) => occupantUpdate(id, payload),
        ...options,
    });
};
