import { IBaseResponse } from "@/interfaces/responses/base";
import { IHistoricalHouseOccupantByHouseResponse } from "@/interfaces/responses/historical-house-occupants";
import { getHistoricalHouseOccupantByHouse } from "@/services/apis/historical-house-occupants";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetHistoricalHouseOccupantByHouse = (
    houseId,
    options?: UseQueryOptions<
        IHistoricalHouseOccupantByHouseResponse,
        IBaseResponse<unknown>,
        IHistoricalHouseOccupantByHouseResponse
    >
) => {
    return useQuery({
        queryKey: ["historical-house-occupant-by-house", houseId],
        queryFn: () => getHistoricalHouseOccupantByHouse(houseId),
        enabled: !!houseId,
        ...options,
    });
};
