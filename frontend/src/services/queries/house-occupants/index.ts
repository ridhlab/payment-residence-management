import { IBaseResponse } from "@/interfaces/responses/base";
import { IHouseOccupantOccupiedResponse } from "@/interfaces/responses/house-occupants";
import { getHouseOccupantOccupied } from "@/services/apis/house-occupants";
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
