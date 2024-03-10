import { IBaseResponse } from "@/interfaces/responses/base";
import {
    IReportBalanceAllTimeResponse,
    IReportIncomesResponse,
    IReportOutcomesResponse,
    IReportPaymentForYearResponse,
} from "@/interfaces/responses/report-payments";
import {
    getBalanceAllTimes,
    getReportIncomes,
    getReportOutcomes,
    getReportPaymentForYear,
} from "@/services/apis/report-payments";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetReportIncomes = (
    date,
    options?: UseQueryOptions<
        IReportIncomesResponse,
        IBaseResponse<unknown>,
        IReportIncomesResponse
    >
) => {
    return useQuery({
        queryKey: ["report-incomes", date],
        queryFn: () => getReportIncomes(date),
        ...options,
    });
};

export const useGetReportOutcomes = (
    date,
    options?: UseQueryOptions<
        IReportOutcomesResponse,
        IBaseResponse<unknown>,
        IReportOutcomesResponse
    >
) => {
    return useQuery({
        queryKey: ["report-incomes", date],
        queryFn: () => getReportOutcomes(date),
        ...options,
    });
};

export const useGetBalanceAllTimes = (
    options?: UseQueryOptions<
        IReportBalanceAllTimeResponse,
        IBaseResponse<unknown>,
        IReportBalanceAllTimeResponse
    >
) => {
    return useQuery({
        queryKey: ["get-balance"],
        queryFn: () => getBalanceAllTimes(),
        ...options,
    });
};

export const useGetReportPaymentForYear = (
    year,
    options?: UseQueryOptions<
        IReportPaymentForYearResponse,
        IBaseResponse<unknown>,
        IReportPaymentForYearResponse
    >
) => {
    return useQuery({
        enabled: !!year,
        queryKey: ["get-report-payment-for-year", year],
        queryFn: () => getReportPaymentForYear(year),
        ...options,
    });
};
