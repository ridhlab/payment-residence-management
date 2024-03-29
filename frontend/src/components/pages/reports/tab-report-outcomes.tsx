import { getCurrencyId } from "@/helpers/currency";
import { numberColumns } from "@/helpers/table";
import { IBaseResponse } from "@/interfaces/responses/base";
import { IReportOutcomesResponse } from "@/interfaces/responses/report-payments";
import { UseQueryResult } from "@tanstack/react-query";
import { DatePicker, Space, Table } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import React from "react";

export default function TabReportOutcomes({
    setDateSelected,
    query,
}: {
    setDateSelected: React.Dispatch<React.SetStateAction<any>>;
    query?: UseQueryResult<IReportOutcomesResponse, IBaseResponse<unknown>>;
}) {
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <DatePicker
                placeholder="Pilih bulan pembayaran"
                picker="month"
                onChange={(val) =>
                    setDateSelected(
                        val ? moment(val.toString()).format("YYYY-MM") : ""
                    )
                }
            />

            <Table
                size="small"
                columns={[
                    numberColumns(),
                    {
                        title: "Tujuan Pengeluaran",
                        dataIndex: "name",
                        key: "outcome-name",
                    },
                    {
                        title: "Tanggal Pengeluaran",
                        dataIndex: "date",
                        key: "outcome-date",
                        render: (val) =>
                            dayjs(val).format("YYYY/MM/DD, HH:mm:ss"),
                    },
                    {
                        title: "Biaya",
                        dataIndex: "fee",
                        key: "outcome-fee",
                        render: (val) => getCurrencyId(val),
                    },
                ]}
                key="table-outcomes"
                loading={query.isLoading || query.isFetching}
                dataSource={query.data?.data}
                scroll={{ x: "auto" }}
            />
        </Space>
    );
}
