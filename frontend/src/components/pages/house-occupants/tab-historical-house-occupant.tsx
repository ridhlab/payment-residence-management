import { IHistoricalHouseOccupantByHouseData } from "@/interfaces/responses/historical-house-occupants";
import { Card, Space, Timeline, Typography } from "antd";

export default function TabHistoricalHouseOccupant({
    historical,
}: {
    historical: IHistoricalHouseOccupantByHouseData[];
}) {
    return (
        <Card title="Riwayat Penghuni Rumah">
            <Timeline
                items={historical.map(
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
        </Card>
    );
}
