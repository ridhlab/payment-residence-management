import { IBaseResponse } from "@/interfaces/responses/base";
import {
    IOccupantDefaultValueForFormResponse,
    IOccupantIndexResponse,
} from "@/interfaces/responses/occupants";
import {
    getOccupantDefaultValueForForm,
    getOccupantIndex,
} from "@/services/apis/occupants";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetOccupantIndex = (
    options?: UseQueryOptions<
        IOccupantIndexResponse,
        IBaseResponse<unknown>,
        IOccupantIndexResponse
    >
) => {
    return useQuery({
        queryKey: ["get-occupant-index"],
        queryFn: () => getOccupantIndex(),
        ...options,
    });
};

export const useGetOccupantDefaultValueForForm = (
    id,
    options?: UseQueryOptions<
        IOccupantDefaultValueForFormResponse,
        IBaseResponse<unknown>,
        IOccupantDefaultValueForFormResponse
    >
) => {
    return useQuery({
        queryKey: ["get-occupant-default-value-for-form", id],
        queryFn: () => getOccupantDefaultValueForForm(id),
        enabled: !!id,
        ...options,
    });
};
