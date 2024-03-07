import { ENDPOINT_API } from "@/routes/list-route";
import { axiosInstance } from "..";
import { AxiosError } from "axios";
import { parsingRoute } from "@/helpers/route";
import {
    IMonthlyExpenseStoreRequest,
    IMonthlyExpenseUpdateRequest,
} from "@/interfaces/requests/monthly-expenses";

export const getMonthlyExpenseIndex = async () => {
    try {
        const response = await axiosInstance.get(
            ENDPOINT_API.MONTHLY_EXPENSE.INDEX
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getMonthlyExpenseDefaultValueForForm = async (id) => {
    try {
        const response = await axiosInstance.get(
            parsingRoute(ENDPOINT_API.MONTHLY_EXPENSE.DEFAULT_VALUE_FOR_FORM, {
                id,
            })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const monthlyExpenseStore = async (
    payload: IMonthlyExpenseStoreRequest
) => {
    try {
        const response = await axiosInstance.post(
            ENDPOINT_API.MONTHLY_EXPENSE.STORE,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const monthlyExpenseUpdate = async (
    id,
    payload: IMonthlyExpenseUpdateRequest
) => {
    try {
        const response = await axiosInstance.put(
            parsingRoute(ENDPOINT_API.MONTHLY_EXPENSE.UPDATE, { id }),
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
