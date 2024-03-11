import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import { Card } from "antd";

export default function DashboardPage() {
    return (
        <MainLayout title="Dashboard" breadcrumbs={BREADCRUBMS.DASHBOARD()}>
            <Card></Card>
        </MainLayout>
    );
}
