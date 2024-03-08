import { occupantStatusTranslation } from "@/common/translation";
import Button from "@/components/shared/button/button";
import { OccupantStatus } from "@/enums/occupant-status";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { ROUTES } from "@/routes/list-route";
import { useRemoveHouseOccupantMutation } from "@/services/mutations/house-occupants";
import { DeleteOutlined } from "@ant-design/icons";
import { Card, Descriptions, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailInformationHouseOccupant({
    code,
    fullname,
    occupantStatus,
}: {
    code: string;
    fullname: string;
    occupantStatus: OccupantStatus;
}) {
    const { id: houseOccupantId } = useParams();
    const navigate = useNavigate();

    const mutationRemove = useRemoveHouseOccupantMutation(houseOccupantId, {
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil menghapus penghuni rumah",
            });
            navigate(ROUTES.HOUSE_OCCUPANT_INDEX);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    const handleClickRemove = () => {
        modalConfirm({
            onOk: () => {
                mutationRemove.mutate(null);
            },
        });
    };

    return (
        <Card
            title="Detail Rumah Penghuni"
            extra={
                <Button icon={<DeleteOutlined />} onClick={handleClickRemove}>
                    Hapus Penghuni
                </Button>
            }
        >
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
