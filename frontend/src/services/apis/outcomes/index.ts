import { ENDPOINT_API } from "@/routes/list-route";
import { axiosInstance } from "..";
import { AxiosError } from "axios";

export const getOutcomeIndex = async () => {
    try {
        const response = await axiosInstance.get(ENDPOINT_API.OUTCOMES.INDEX);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const addOutcome = async (payload) => {
    try {
        const response = await axiosInstance.post(
            ENDPOINT_API.OUTCOMES.ADD_OUTCOME,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
