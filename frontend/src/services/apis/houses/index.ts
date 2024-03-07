import { ENDPOINT_API } from "@/routes/list-route";
import { axiosInstance } from "..";
import { AxiosError } from "axios";
import { parsingRoute } from "@/helpers/route";
import {
    IHouseStoreRequest,
    IHouseUpdateRequest,
} from "@/interfaces/requests/houses";

export const getHouseIndex = async () => {
    try {
        const response = await axiosInstance.get(ENDPOINT_API.HOUSES.INDEX);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getHouseDefaultValueForForm = async (id) => {
    try {
        const response = await axiosInstance.get(
            parsingRoute(ENDPOINT_API.HOUSES.DEFAULT_VALUE_FOR_FORM, { id })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const houseStore = async (payload: IHouseStoreRequest) => {
    try {
        const response = await axiosInstance.post(
            ENDPOINT_API.HOUSES.STORE,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const houseUpdate = async (id, payload: IHouseUpdateRequest) => {
    try {
        const response = await axiosInstance.put(
            parsingRoute(ENDPOINT_API.HOUSES.UPDATE, { id }),
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
