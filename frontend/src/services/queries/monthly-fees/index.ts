import { IBaseResponse } from "@/interfaces/responses/base";
import {
    IMonthlyFeeDefaultValueForFormResponse,
    IMonthlyFeeIndexResponse,
} from "@/interfaces/responses/monthly-fees";
import {
    getMonthlyFeeDefaultValueForForm,
    getMonthlyFeeIndex,
} from "@/services/apis/monthly-fees";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetMonthlyFeeIndex = (
    options?: UseQueryOptions<
        IMonthlyFeeIndexResponse,
        IBaseResponse<unknown>,
        IMonthlyFeeIndexResponse
    >
) => {
    return useQuery({
        queryKey: ["get-monthly-fee-index"],
        queryFn: () => getMonthlyFeeIndex(),
        ...options,
    });
};

export const useGetMonthlyFeeDefaultValueForForm = (
    id,
    options?: UseQueryOptions<
        IMonthlyFeeDefaultValueForFormResponse,
        IBaseResponse<unknown>,
        IMonthlyFeeDefaultValueForFormResponse
    >
) => {
    return useQuery({
        queryKey: ["get-monthly-fee-default-value-for-form", id],
        queryFn: () => getMonthlyFeeDefaultValueForForm(id),
        enabled: !!id,
        ...options,
    });
};
