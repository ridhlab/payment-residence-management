import { IBaseResponse } from "@/interfaces/responses/base";
import {
    IHouseOccupantDetailResponse,
    IHouseOccupantOccupiedResponse,
} from "@/interfaces/responses/house-occupants";
import {
    getDetailHouseOccupant,
    getHouseOccupantOccupied,
} from "@/services/apis/house-occupants";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetHouseOccupantOccupied = (
    options?: UseQueryOptions<
        IHouseOccupantOccupiedResponse,
        IBaseResponse<unknown>,
        IHouseOccupantOccupiedResponse
    >
) => {
    return useQuery({
        queryKey: ["get-house-occupant-occupied"],
        queryFn: () => getHouseOccupantOccupied(),
        ...options,
    });
};

export const useGetDetailHouseOccupant = (
    id,
    options?: UseQueryOptions<
        IHouseOccupantDetailResponse,
        IBaseResponse<unknown>,
        IHouseOccupantDetailResponse
    >
) => {
    return useQuery({
        queryKey: ["get-detail-house-occupant", id],
        queryFn: () => getDetailHouseOccupant(id),
        enabled: !!id,
        ...options,
    });
};
