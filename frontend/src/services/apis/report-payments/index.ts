import { AxiosError } from "axios";
import { axiosInstance } from "..";
import { parsingRoute, routeWithParams } from "@/helpers/route";
import { ENDPOINT_API } from "@/routes/list-route";

export const getReportIncomes = async (date, paymentForDate) => {
    try {
        const response = await axiosInstance.get(
            routeWithParams(ENDPOINT_API.REPORT_PAYMENTS.INCOMES, {
                date,
                payment_for_date: paymentForDate,
            })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getReportOutcomes = async (date) => {
    try {
        const response = await axiosInstance.get(
            routeWithParams(ENDPOINT_API.REPORT_PAYMENTS.OUTCOMES, { date })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getBalanceAllTimes = async () => {
    try {
        const response = await axiosInstance.get(
            ENDPOINT_API.REPORT_PAYMENTS.BALANCE
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};

export const getReportPaymentForYear = async (year) => {
    try {
        const response = await axiosInstance.get(
            parsingRoute(ENDPOINT_API.REPORT_PAYMENTS.FOR_YEAR, { year })
        );
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response.data;
    }
};
