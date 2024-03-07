import { IBaseResponse } from "@/interfaces/responses/base";
import {
    IHouseDefaultValueForFormResponse,
    IHouseIndexResponse,
} from "@/interfaces/responses/houses";
import {
    getHouseDefaultValueForForm,
    getHouseIndex,
} from "@/services/apis/houses";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetHouseIndex = (
    options?: UseQueryOptions<
        IHouseIndexResponse,
        IBaseResponse<unknown>,
        IHouseIndexResponse
    >
) => {
    return useQuery({
        queryKey: ["get-house-index"],
        queryFn: () => getHouseIndex(),
        ...options,
    });
};

export const useGetHouseDefaultValueForForm = (
    id,
    options?: UseQueryOptions<
        IHouseDefaultValueForFormResponse,
        IBaseResponse<unknown>,
        IHouseDefaultValueForFormResponse
    >
) => {
    return useQuery({
        queryKey: ["get-house-default-value-for-form", id],
        queryFn: () => getHouseDefaultValueForForm(id),
        enabled: !!id,
        ...options,
    });
};
