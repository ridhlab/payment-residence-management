import { ENDPOINT_API } from "@/routes/list-route";
import { axiosInstance } from "..";
import { AxiosError } from "axios";

export const getHouseIndex = async () => {
    try {
        const response = await axiosInstance.get(ENDPOINT_API.HOUSES.INDEX);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
