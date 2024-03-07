import { IBaseResponse } from "@/interfaces/responses/base";
import { IHouseIndexResponse } from "@/interfaces/responses/houses";
import { getHouseIndex } from "@/services/apis/houses";
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
