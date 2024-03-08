import { BREADCRUBMS } from "@/common/breadcrumbs";
import { occupantStatusTranslation } from "@/common/translation";
import MainLayout from "@/components/layouts/main";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { OccupantStatus } from "@/enums/occupant-status";
import { useGetHistoricalHouseOccupantByHouse } from "@/services/queries/historical-house-occupants";
import { useGetDetailHouseOccupant } from "@/services/queries/house-occupants";
import {
    Card,
    Descriptions,
    Space,
    Tabs,
    Tag,
    Timeline,
    Typography,
} from "antd";
import { useParams } from "react-router-dom";

export default function HouseOccupantDetailPage() {
    const { id } = useParams();
    const query = useGetDetailHouseOccupant(id);
    const queryHistoricalHouseOccupant = useGetHistoricalHouseOccupantByHouse(
        query.data?.data.houseId
    );
    const contentHistoricalHouseOccupants =
        queryHistoricalHouseOccupant.isLoading ||
        queryHistoricalHouseOccupant.isFetching ? (
            <LoaderCenter />
        ) : (
            <Timeline
                items={queryHistoricalHouseOccupant.data?.data.map(
                    ({
                        endDate,
                        id,
                        isStillOccupant,
                        occupantName,
                        startDate,
                    }) => ({
                        key: id,
                        color: isStillOccupant ? "green" : "gray",
                        children: (
                            <Space direction="vertical">
                                <Typography.Text>
                                    Nama Penghuni : {occupantName}
                                </Typography.Text>
                                <Typography.Text>
                                    Tanggal Mulai Menghuni : {startDate}
                                </Typography.Text>
                                <Typography.Text>
                                    Tanggal Keluar: {endDate ?? "-"}
                                </Typography.Text>
                            </Space>
                        ),
                    })
                )}
            />
        );
    const contentHistoricalPayments = "";

    return (
        <MainLayout
            title="Detail Rumah Penghuni"
            breadcrumbs={BREADCRUBMS.HOUSE_OCCUPANT.DETAIL(id)}
        >
            {query.isLoading || query.isFetching ? (
                <LoaderCenter />
            ) : (
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Card title="Detail Rumah Penghuni">
                        <Descriptions>
                            <Descriptions.Item label="Kode Rumah">
                                {query.data.data.house.code}
                            </Descriptions.Item>
                            <Descriptions.Item label="Nama Penghuni">
                                {query.data.data.occupant.fullname}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status Menghuni">
                                <Tag
                                    color={
                                        query.data.data.occupantStatus ===
                                        OccupantStatus.PERMANENT
                                            ? "green"
                                            : "blue"
                                    }
                                >
                                    {occupantStatusTranslation(
                                        query.data.data.occupantStatus
                                    )}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
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
