import { AxiosError } from "axios";
import { axiosInstance } from "..";
import { ENDPOINT_API } from "@/routes/list-route";
import { parsingRoute } from "@/helpers/route";

export const addPayments = async (payload) => {
    try {
        const response = await axiosInstance.post(
            ENDPOINT_API.PAYMENTS.ADD_PAYMENTS,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getPaymentByHouseOccupantId = async (houseOccupantId) => {
    try {
        const reponse = await axiosInstance.get(
            parsingRoute(ENDPOINT_API.PAYMENTS.BY_HOUSE_OCCUPANT_ID, {
                houseOccupantId,
            })
        );
        return reponse.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
