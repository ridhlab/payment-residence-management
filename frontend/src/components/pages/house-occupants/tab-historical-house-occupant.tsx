import LoaderCenter from "@/components/shared/loader/loader-center";
import { useGetHistoricalHouseOccupantByHouse } from "@/services/queries/historical-house-occupants";
import { Card, Space, Timeline, Typography } from "antd";

export default function TabHistoricalHouseOccupant({
    houseId,
}: {
    houseId: number;
}) {
    const queryHistoricalHouseOccupant =
        useGetHistoricalHouseOccupantByHouse(houseId);

    return (
        <Card title="Riwayat Penghuni Rumah">
            {queryHistoricalHouseOccupant?.isLoading ||
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
            )}
        </Card>
    );
}
