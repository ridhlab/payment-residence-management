import { AxiosError } from "axios";
import { axiosInstance } from "..";
import { parsingRoute } from "@/helpers/route";
import { ENDPOINT_API } from "@/routes/list-route";

export const getHistoricalHouseOccupantByHouse = async (houseId) => {
    try {
        const response = await axiosInstance.get(
            parsingRoute(ENDPOINT_API.HISTORICAL_HOUSE_OCCUPANTS.BY_HOUSE, {
                houseId,
            })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
