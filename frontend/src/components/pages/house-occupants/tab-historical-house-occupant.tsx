import LoaderCenter from "@/components/shared/loader/loader-center";
import { useGetHistoricalHouseOccupantByHouse } from "@/services/queries/historical-house-occupants";
import { Card, Space, Timeline, Typography } from "antd";
import dayjs from "dayjs";

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
                                        Tanggal Mulai Menghuni :{" "}
                                        {dayjs(startDate).format("YYYY/MM/DD")}
                                    </Typography.Text>
                                    <Typography.Text>
                                        Tanggal Keluar:{" "}
                                        {endDate
                                            ? dayjs(endDate).format(
                                                  "YYYY/MM/DD"
                                              )
                                            : "-"}
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
