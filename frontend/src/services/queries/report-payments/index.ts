import { IBaseResponse } from "@/interfaces/responses/base";
import {
    IReportIncomesResponse,
    IReportOutcomesResponse,
} from "@/interfaces/responses/report-payments";
import {
    getReportIncomes,
    getReportOutcomes,
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
