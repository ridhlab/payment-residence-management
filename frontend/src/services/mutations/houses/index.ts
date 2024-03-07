import {
    IHouseStoreRequest,
    IHouseUpdateRequest,
} from "@/interfaces/requests/houses";
import { IBaseResponse } from "@/interfaces/responses/base";
import { houseStore, houseUpdate } from "@/services/apis/houses";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useHouseMutationStore = (
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IHouseStoreRequest
    >
) => {
    return useMutation({
        mutationKey: ["house-store"],
        mutationFn: (payload) => houseStore(payload),
        ...options,
    });
};

export const useHouseMutationUpdate = (
    id,
    options?: UseMutationOptions<
        IBaseResponse<unknown>,
        IBaseResponse<unknown>,
        IHouseUpdateRequest
    >
) => {
    return useMutation({
        mutationKey: ["house-update"],
        mutationFn: (payload) => houseUpdate(id, payload),
        ...options,
    });
};
