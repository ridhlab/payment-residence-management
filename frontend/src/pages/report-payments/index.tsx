import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import { Card } from "antd";

export default function ReportPaymentPage() {
    return (
        <MainLayout
            title="Laporan Pembayaran"
            breadcrumbs={BREADCRUBMS.REPORT_PAYMENT()}
        >
            <Card></Card>
        </MainLayout>
    );
}
