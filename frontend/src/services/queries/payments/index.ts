import { IBaseResponse } from "@/interfaces/responses/base";
import {
    IPaymentByHouseOccupantResponse,
    IPaymentNotOrPaidResponse,
} from "@/interfaces/responses/payments";
import {
    getNotPaidPaymentByHouseOccupant,
    getPaidPaymentByHouseOccupant,
    getPaymentByHouseOccupantId,
} from "@/services/apis/payments";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetPaymentByHouseOccupantId = (
    houseOccupantId,
    options?: UseQueryOptions<
        IPaymentByHouseOccupantResponse,
        IBaseResponse<unknown>,
        IPaymentByHouseOccupantResponse
    >
) => {
    return useQuery({
        queryKey: ["get-payment-by-house-occupant", houseOccupantId],
        queryFn: () => getPaymentByHouseOccupantId(houseOccupantId),
        enabled: !!houseOccupantId,
        ...options,
    });
};

export const useGetPaymentPaidByHouseOccupant = (
    houseOccupantId,
    options?: UseQueryOptions<
        IPaymentNotOrPaidResponse,
        IBaseResponse<unknown>,
        IPaymentNotOrPaidResponse
    >
) => {
    return useQuery({
        queryKey: ["get-paid-by-house-occupant", houseOccupantId],
        queryFn: () => getPaidPaymentByHouseOccupant(houseOccupantId),
        enabled: !!houseOccupantId,
        ...options,
    });
};

export const useGetPaymentNotPaidByHouseOccupant = (
    houseOccupantId,
    options?: UseQueryOptions<
        IPaymentNotOrPaidResponse,
        IBaseResponse<unknown>,
        IPaymentNotOrPaidResponse
    >
) => {
    return useQuery({
        queryKey: ["get-not-paid-by-house-occupant", houseOccupantId],
        queryFn: () => getNotPaidPaymentByHouseOccupant(houseOccupantId),
        enabled: !!houseOccupantId,
        ...options,
    });
};
