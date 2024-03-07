import { ENDPOINT_API } from "@/routes/list-route";
import { axiosInstance } from "..";
import { AxiosError } from "axios";
import { parsingRoute } from "@/helpers/route";
import {
    IMonthlyFeeStoreRequest,
    IMonthlyFeeUpdateRequest,
} from "@/interfaces/requests/monthly-fees";

export const getMonthlyFeeIndex = async () => {
    try {
        const response = await axiosInstance.get(
            ENDPOINT_API.MONTHLY_FEES.INDEX
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getMonthlyFeeDefaultValueForForm = async (id) => {
    try {
        const response = await axiosInstance.get(
            parsingRoute(ENDPOINT_API.MONTHLY_FEES.DEFAULT_VALUE_FOR_FORM, {
                id,
            })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const monthlyFeeStore = async (payload: IMonthlyFeeStoreRequest) => {
    try {
        const response = await axiosInstance.post(
            ENDPOINT_API.MONTHLY_FEES.STORE,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const monthlyFeeUpdate = async (
    id,
    payload: IMonthlyFeeUpdateRequest
) => {
    try {
        const response = await axiosInstance.put(
            parsingRoute(ENDPOINT_API.MONTHLY_FEES.UPDATE, { id }),
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
