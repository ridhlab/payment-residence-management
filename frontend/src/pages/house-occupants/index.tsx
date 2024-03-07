import { BREADCRUBMS } from "@/common/breadcrumbs";
import { occupantStatusTranslation } from "@/common/translation";
import MainLayout from "@/components/layouts/main";
import LoaderCenter from "@/components/shared/loader/loader-center";
import RowActionButtons from "@/components/shared/table/row-action-buttons";
import { OccupantStatus } from "@/enums/occupant-status";
import { parsingRoute } from "@/helpers/route";
import { numberColumns } from "@/helpers/table";
import { IHouseOccupantOcccupiedData } from "@/interfaces/responses/house-occupants";
import { ROUTES } from "@/routes/list-route";
import { useGetHouseOccupantOccupied } from "@/services/queries/house-occupants";
import { Card, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

export default function HouseOccupantIndexPage() {
    const query = useGetHouseOccupantOccupied();

    const columns: ColumnsType<IHouseOccupantOcccupiedData> = [
        numberColumns(),
        {
            title: "Kode Rumah",
            dataIndex: "houseCode",
            key: "houseCode",
        },
        {
            title: "Nama Penghuni",
            dataIndex: "occupantName",
            key: "occupantName",
        },
        {
            title: "Status Penghuni",
            dataIndex: "occupantStatus",
            key: "occupantStatus",
            render: (status) => (
                <Tag
                    color={
                        status === OccupantStatus.PERMANENT ? "green" : "blue"
                    }
                >
                    {occupantStatusTranslation(status)}
                </Tag>
            ),
        },
        {
            title: "Aksi",
            dataIndex: "id",
            key: "action",
            render: (id) => (
                <RowActionButtons
                    actions={[
                        {
                            type: "detail",
                            href: parsingRoute(ROUTES.HOUSE_OCCUPANT_DETAIL, {
                                id,
                            }),
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <MainLayout
            title="Daftar Penghuni Rumah Aktif"
            breadcrumbs={BREADCRUBMS.HOUSE_OCCUPANT.INDEX()}
        >
            <Card>
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Table
                        bordered
                        size="small"
                        dataSource={query.data.data}
                        columns={columns}
                        scroll={{
                            x: 500,
                        }}
                    />
                )}
            </Card>
        </MainLayout>
    );
}
