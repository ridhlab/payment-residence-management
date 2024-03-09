import { IBaseResponse } from "@/interfaces/responses/base";
import { IOutcomeIndexResponse } from "@/interfaces/responses/outcomes";
import { getOutcomeIndex } from "@/services/apis/outcomes";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetOutcomeIndex = (
    options?: UseQueryOptions<
        IOutcomeIndexResponse,
        IBaseResponse<unknown>,
        IOutcomeIndexResponse
    >
) => {
    return useQuery({
        queryKey: ["get-oucome-index"],
        queryFn: () => getOutcomeIndex(),
        ...options,
    });
};
