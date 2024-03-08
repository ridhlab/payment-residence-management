import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import DetailInformationHouseOccupant from "@/components/pages/house-occupants/detail-information";
import TabHistoricalHouseOccupant from "@/components/pages/house-occupants/tab-historical-house-occupant";
import TabPaymentHistory from "@/components/pages/house-occupants/tab-payments-history";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { useGetDetailHouseOccupant } from "@/services/queries/house-occupants";
import { Card, Space, Tabs } from "antd";
import { useParams } from "react-router-dom";

export default function HouseOccupantDetailPage() {
    const { id } = useParams();
    const query = useGetDetailHouseOccupant(id);

    const contentHistoricalHouseOccupants = (
        <TabHistoricalHouseOccupant houseId={query?.data?.data?.houseId} />
    );

    const contentHistoricalPayments = <TabPaymentHistory />;

    return (
        <MainLayout
            title="Detail Rumah Penghuni"
            breadcrumbs={BREADCRUBMS.HOUSE_OCCUPANT.DETAIL(id)}
        >
            {query.isLoading || query.isFetching ? (
                <LoaderCenter />
            ) : (
                <Space direction="vertical" style={{ width: "100%" }}>
                    <DetailInformationHouseOccupant
                        code={query.data.data?.house.code}
                        fullname={query.data.data?.occupant.fullname}
                        occupantStatus={query.data?.data.occupantStatus}
                    />
                    <Card>
                        <Tabs
                            items={[
                                {
                                    key: "historical-house-occupant",
                                    label: "Riwayat Yang Menghuni Rumah",
                                    children: contentHistoricalHouseOccupants,
                                },
                                {
                                    key: "historical-payment",
                                    label: "Riwayat Pembayaran",
                                    children: contentHistoricalPayments,
                                },
                            ]}
                        />
                    </Card>
                </Space>
            )}
        </MainLayout>
    );
}
