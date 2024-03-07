import { AxiosError } from "axios";
import { axiosInstance } from "..";
import { ENDPOINT_API } from "@/routes/list-route";

export const getHouseOccupantOccupied = async () => {
    try {
        const response = await axiosInstance.get(
            ENDPOINT_API.HOUSE_OCCUPANTS.GET_HOUSE_OCCUPIED
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const addHouseOccupant = async (payload) => {
    try {
        const response = await axiosInstance.post(
            ENDPOINT_API.HOUSE_OCCUPANTS.ADD_OCCUPANT,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
