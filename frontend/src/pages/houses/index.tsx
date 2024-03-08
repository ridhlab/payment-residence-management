import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import AddButton from "@/components/shared/button/add-button";
import LoaderCenter from "@/components/shared/loader/loader-center";
import RowActionButtons from "@/components/shared/table/row-action-buttons";
import { parsingRoute } from "@/helpers/route";
import { numberColumns } from "@/helpers/table";
import { IHouseIndexData } from "@/interfaces/responses/houses";
import { ROUTES } from "@/routes/list-route";
import { useGetHouseIndex } from "@/services/queries/houses";
import { Card, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

export default function HousePage() {
    const query = useGetHouseIndex();
    const columns: ColumnsType<IHouseIndexData> = [
        numberColumns(),
        {
            title: "Kode Rumah",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Status",
            dataIndex: "isOccupied",
            key: "isOccupied",
            render: (val) =>
                val ? (
                    <Tag color="green">Dihuni</Tag>
                ) : (
                    <Tag color="yellow">Tidak Dihuni</Tag>
                ),
        },
        {
            title: "Penghuni",
            dataIndex: "occupant",
            key: "occupant",
            render: (val) => val ?? "-",
        },
        {
            title: "Aksi",
            dataIndex: "id",
            key: "action",
            render: (id) => (
                <RowActionButtons
                    actions={[
                        {
                            type: "edit",
                            href: parsingRoute(ROUTES.HOUSE_EDIT, { id }),
                        },
                    ]}
                />
            ),
        },
    ];
    return (
        <MainLayout
            title="Daftar Rumah"
            breadcrumbs={BREADCRUBMS.HOUSE.INDEX()}
        >
            <Card extra={<AddButton href={ROUTES.HOUSE_CREATE} />}>
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Table
                        bordered
                        size="small"
                        dataSource={query.data.data}
                        columns={columns}
                        scroll={{
                            x: "auto",
                        }}
                    />
                )}
            </Card>
        </MainLayout>
    );
}
