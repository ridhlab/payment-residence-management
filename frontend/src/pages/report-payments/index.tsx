import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import TabChartPayment from "@/components/pages/reports/tab-chart-payments";
import TabReportPayments from "@/components/pages/reports/tab-report-payments";
import { Card, Tabs } from "antd";

export default function ReportPaymentPage() {
    const items = [
        {
            key: "report",
            label: "Laporan Pemasukan/Pengeluaran",
            children: <TabReportPayments />,
        },
        {
            key: "chart",
            label: "Grafik Pemasukan/Pengeluaran",
            children: <TabChartPayment />,
        },
    ];

    return (
        <MainLayout
            title="Laporan Pembayaran"
            breadcrumbs={BREADCRUBMS.REPORT_PAYMENT()}
        >
            <Card>
                <Tabs items={items} />
            </Card>
        </MainLayout>
    );
}
