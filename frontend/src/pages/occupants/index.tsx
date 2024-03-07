import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import AddButton from "@/components/shared/button/add-button";
import LoaderCenter from "@/components/shared/loader/loader-center";
import RowActionButtons from "@/components/shared/table/row-action-buttons";
import { parsingRoute } from "@/helpers/route";
import { numberColumns } from "@/helpers/table";
import { IOccupant } from "@/interfaces/entities/occupants";
import { ROUTES } from "@/routes/list-route";
import { useGetOccupantIndex } from "@/services/queries/occupants";
import { Card, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

export default function OccupantIndexPage() {
    const query = useGetOccupantIndex();

    const columns: ColumnsType<IOccupant> = [
        numberColumns(),
        {
            title: "Nama Lengkap",
            dataIndex: "fullname",
            key: "fullname",
        },
        {
            title: "Status Pernikahan",
            dataIndex: "isMarried",
            key: "isMarried",
            render: (val) =>
                val ? (
                    <Tag color="green">Menikah</Tag>
                ) : (
                    <Tag color="yellow">Lajang</Tag>
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
                            type: "edit",
                            href: parsingRoute(ROUTES.OCCUPANT_EDIT, { id }),
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <MainLayout
            title="Daftar Penghuni"
            breadcrumbs={BREADCRUBMS.OCCUPANT.INDEX()}
        >
            <Card extra={<AddButton href={ROUTES.OCCUPANT_CREATE} />}>
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
