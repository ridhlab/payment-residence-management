import { occupantStatusTranslation } from "@/common/translation";
import { OccupantStatus } from "@/enums/occupant-status";
import { Card, Descriptions, Tag } from "antd";

export default function DetailInformationHouseOccupant({
    code,
    fullname,
    occupantStatus,
}: {
    code: string;
    fullname: string;
    occupantStatus: OccupantStatus;
}) {
    return (
        <Card title="Detail Rumah Penghuni">
            <Descriptions>
                <Descriptions.Item label="Kode Rumah">{code}</Descriptions.Item>
                <Descriptions.Item label="Nama Penghuni">
                    {fullname}
                </Descriptions.Item>
                <Descriptions.Item label="Status Menghuni">
                    <Tag
                        color={
                            occupantStatus === OccupantStatus.PERMANENT
                                ? "green"
                                : "blue"
                        }
                    >
                        {occupantStatusTranslation(occupantStatus)}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
}
