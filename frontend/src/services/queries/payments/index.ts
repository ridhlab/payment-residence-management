import { IBaseResponse } from "@/interfaces/responses/base";
import { IPaymentByHouseOccupantResponse } from "@/interfaces/responses/payments";
import { getPaymentByHouseOccupantId } from "@/services/apis/payments";
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
