import LoaderCenter from "@/components/shared/loader/loader-center";
import { getMonthInIndonesia } from "@/helpers/date";
import { useGetReportPaymentForYear } from "@/services/queries/report-payments";
import { colorConfig } from "@/themes/color";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function TabChartPayment() {
    const [yearSelected, setYearSelected] = React.useState(
        new Date().getFullYear()
    );
    console.log({ yearSelected });

    const query = useGetReportPaymentForYear(yearSelected);

    const lineChartNode = (
        <ResponsiveContainer width="100%" minHeight={500}>
            <LineChart
                data={query?.data?.data?.map((data) => ({
                    ...data,
                    month: getMonthInIndonesia(data.month),
                }))}
            >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line
                    type="monotone"
                    dataKey="totalIncomes"
                    stroke={colorConfig.primary.main}
                    name="Total Pemasukan"
                />
                <Line
                    type="monotone"
                    dataKey="totalOutcomes"
                    stroke={colorConfig.feedback.warning}
                    name="Total Pengeluaran"
                />
                <Line
                    type="monotone"
                    dataKey="balance"
                    stroke={colorConfig.feedback.success}
                    name="Balance"
                />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );

    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <DatePicker
                picker="year"
                value={dayjs(`${yearSelected}-01-01`)}
                onChange={(val) =>
                    val
                        ? setYearSelected(
                              parseInt(moment(val.toString()).format("YYYY"))
                          )
                        : setYearSelected(new Date().getFullYear())
                }
            />
            {query?.isLoading || query?.isFetching ? (
                <LoaderCenter />
            ) : (
                lineChartNode
            )}
        </Space>
    );
}
