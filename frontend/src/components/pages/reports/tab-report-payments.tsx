import { Tabs } from "antd";
import TabReportIncomes from "./tab-report-incomes";
import TabReportOutcomes from "./tab-report-outcomes";
import {
    useGetReportIncomes,
    useGetReportOutcomes,
} from "@/services/queries/report-payments";
import React from "react";

export default function TabReportPayments() {
    const [dateSelectedIncomes, setDateSelectedIncomes] = React.useState(null);
    const [
        paymentForDateSelectedIncomes,
        setPaymentForDateDateSelectedIncomes,
    ] = React.useState(null);

    const queryIncomes = useGetReportIncomes(
        dateSelectedIncomes ?? "",
        paymentForDateSelectedIncomes ?? ""
    );

    const [dateSelectedOutcomes, setDateSelectedOutcomes] =
        React.useState(null);
    const queryOutcomes = useGetReportOutcomes(dateSelectedOutcomes ?? "");

    return (
        <Tabs
            onChange={(key) => {
                if (key === "incomes") {
                    queryIncomes.refetch();
                } else {
                    queryOutcomes.refetch();
                }
            }}
            items={[
                {
                    key: "incomes",
                    label: "Pemasukan",
                    children: (
                        <TabReportIncomes
                            setDateSelected={setDateSelectedIncomes}
                            query={queryIncomes}
                            setPaymentForDateDateSelected={
                                setPaymentForDateDateSelectedIncomes
                            }
                        />
                    ),
                },
                {
                    key: "outcomes",
                    label: "Pengeluaran",
                    children: (
                        <TabReportOutcomes
                            setDateSelected={setDateSelectedOutcomes}
                            query={queryOutcomes}
                        />
                    ),
                },
            ]}
        />
    );
}
