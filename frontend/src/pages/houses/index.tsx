import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import { Card } from "antd";

export default function HousePage() {
    return (
        <MainLayout title="List House" breadcrumbs={BREADCRUBMS.HOUSE.INDEX()}>
            <Card></Card>
        </MainLayout>
    );
}
