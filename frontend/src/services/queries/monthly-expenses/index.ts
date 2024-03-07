import { IBaseResponse } from "@/interfaces/responses/base";
import {
    IMonthlyExpenseDefaultValueForFormResponse,
    IMonthlyExpenseIndexResponse,
} from "@/interfaces/responses/monthly-expenses";
import {
    getMonthlyExpenseDefaultValueForForm,
    getMonthlyExpenseIndex,
} from "@/services/apis/monthly-expenses";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetMonthlyExpenseIndex = (
    options?: UseQueryOptions<
        IMonthlyExpenseIndexResponse,
        IBaseResponse<unknown>,
        IMonthlyExpenseIndexResponse
    >
) => {
    return useQuery({
        queryKey: ["get-monthly-expense-index"],
        queryFn: () => getMonthlyExpenseIndex(),
        ...options,
    });
};

export const useGetMonthlyExpenseDefaultValueForForm = (
    id,
    options?: UseQueryOptions<
        IMonthlyExpenseDefaultValueForFormResponse,
        IBaseResponse<unknown>,
        IMonthlyExpenseDefaultValueForFormResponse
    >
) => {
    return useQuery({
        queryKey: ["get-monthly-expense-default-value-for-form", id],
        queryFn: () => getMonthlyExpenseDefaultValueForForm(id),
        enabled: !!id,
        ...options,
    });
};
