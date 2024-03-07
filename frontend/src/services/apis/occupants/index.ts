import { ENDPOINT_API } from "@/routes/list-route";
import { axiosInstance } from "..";
import { AxiosError } from "axios";
import { parsingRoute, routeWithParams } from "@/helpers/route";
import {
    IOccupantStoreRequest,
    IOccupantUpdateRequest,
} from "@/interfaces/requests/occupants";

export const getOccupantIndex = async () => {
    try {
        const response = await axiosInstance.get(ENDPOINT_API.OCCUPANTS.INDEX);
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getOccupantDefaultValueForForm = async (id) => {
    try {
        const response = await axiosInstance.get(
            parsingRoute(ENDPOINT_API.OCCUPANTS.DEFAULT_VALUE_FOR_FORM, { id })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const occupantStore = async (payload: IOccupantStoreRequest) => {
    try {
        const response = await axiosInstance.post(
            ENDPOINT_API.OCCUPANTS.STORE,
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const occupantUpdate = async (id, payload: IOccupantUpdateRequest) => {
    try {
        const response = await axiosInstance.put(
            parsingRoute(ENDPOINT_API.OCCUPANTS.UPDATE, { id }),
            payload
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getOccupantDropdownNotOccupy = async (search) => {
    try {
        const response = await axiosInstance.get(
            routeWithParams(ENDPOINT_API.OCCUPANTS.DROPDOWN.NOT_OCCUPY, {
                search,
            })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
