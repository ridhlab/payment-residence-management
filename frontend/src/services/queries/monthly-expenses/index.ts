import { IBaseResponse } from "@/interfaces/responses/base";
import {
    IMonthlyExpenseByIsPaidOrNotPaidResponse,
    IMonthlyExpenseDefaultValueForFormResponse,
    IMonthlyExpenseIndexResponse,
} from "@/interfaces/responses/monthly-expenses";
import {
    getMonthlyExpenseByIsNotPaidMonthly,
    getMonthlyExpenseByIsPaidMonthly,
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

export const useGetMonthlyExpenseByIsPaidMonthly = (
    options?: UseQueryOptions<
        IMonthlyExpenseByIsPaidOrNotPaidResponse,
        IBaseResponse<unknown>,
        IMonthlyExpenseByIsPaidOrNotPaidResponse
    >
) => {
    return useQuery({
        queryKey: ["get-monthly-expense-by-is-paid-monthly"],
        queryFn: () => getMonthlyExpenseByIsPaidMonthly(),
        ...options,
    });
};

export const useGetMonthlyExpenseByIsNotPaidMonthly = (
    options?: UseQueryOptions<
        IMonthlyExpenseByIsPaidOrNotPaidResponse,
        IBaseResponse<unknown>,
        IMonthlyExpenseByIsPaidOrNotPaidResponse
    >
) => {
    return useQuery({
        queryKey: ["get-monthly-expense-by-is-not-paid-monthly"],
        queryFn: () => getMonthlyExpenseByIsNotPaidMonthly(),
        ...options,
    });
};
