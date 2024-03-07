import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import AddButton from "@/components/shared/button/add-button";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { numberColumns } from "@/helpers/table";
import { IHouse } from "@/interfaces/entities/houses";
import { ROUTES } from "@/routes/list-route";
import { useGetHouseIndex } from "@/services/queries/houses";
import { Card, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

export default function HousePage() {
    const query = useGetHouseIndex();
    const columns: ColumnsType<IHouse> = [
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
                    <Tag color="green">Terisi</Tag>
                ) : (
                    <Tag color="yellow">Kosong</Tag>
                ),
        },
    ];
    return (
        <MainLayout title="List House" breadcrumbs={BREADCRUBMS.HOUSE.INDEX()}>
            <Card extra={<AddButton href={ROUTES.HOUSE_CREATE} />}>
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Table
                        bordered
                        size="small"
                        dataSource={query.data.data}
                        columns={columns}
                    />
                )}
            </Card>
        </MainLayout>
    );
}