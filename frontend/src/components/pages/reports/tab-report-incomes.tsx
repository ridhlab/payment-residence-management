import { getCurrencyId } from "@/helpers/currency";
import { numberColumns } from "@/helpers/table";
import { IBaseResponse } from "@/interfaces/responses/base";
import { IReportIncomesResponse } from "@/interfaces/responses/report-payments";
import { UseQueryResult } from "@tanstack/react-query";
import { Col, DatePicker, Grid, Row, Space, Table } from "antd";
import moment from "moment";
import React from "react";

export default function TabReportIncomes({
    setDateSelected,
    query,
    setPaymentForDateDateSelected,
}: {
    setDateSelected: React.Dispatch<React.SetStateAction<any>>;
    setPaymentForDateDateSelected: React.Dispatch<React.SetStateAction<any>>;
    query?: UseQueryResult<IReportIncomesResponse, IBaseResponse<unknown>>;
}) {
    const { md } = Grid.useBreakpoint();
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Row gutter={[8, 8]}>
                <Col span={md ? 12 : 24}>
                    <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Pilih bulan pembayaran"
                        picker="month"
                        onChange={(val) =>
                            setDateSelected(
                                val
                                    ? moment(val.toString()).format("YYYY-MM")
                                    : ""
                            )
                        }
                    />
                </Col>
                <Col span={md ? 12 : 24}>
                    <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Pilih pembayaran untuk bulan"
                        picker="month"
                        onChange={(val) =>
                            setPaymentForDateDateSelected(
                                val
                                    ? moment(val.toString()).format("YYYY-MM")
                                    : ""
                            )
                        }
                    />
                </Col>
            </Row>

            <Table
                key="table-incomes"
                columns={[
                    numberColumns(),
                    {
                        title: "Kode Rumah",
                        dataIndex: "houseCode",
                        key: "income-house-code",
                    },
                    {
                        title: "Penghuni",
                        dataIndex: "occupant",
                        key: "income-occupant",
                    },
                    {
                        title: "Tanggal Bayar",
                        dataIndex: "paymentDate",
                        key: "income-payment-date",
                    },
                    {
                        title: "Nama Iuran",
                        dataIndex: "paymentName",
                        key: "income-payment-name",
                    },
                    {
                        title: "Biaya",
                        dataIndex: "fee",
                        key: "income-fee",
                        render: (val) => getCurrencyId(val),
                    },
                    {
                        title: "Pembayaran untuk Bulan",
                        dataIndex: "paymentForDate",
                        key: "income-payment-for-date",
                    },
                ]}
                loading={query.isLoading || query.isFetching}
                dataSource={query.data?.data}
                scroll={{ x: "auto" }}
            />
        </Space>
    );
}
