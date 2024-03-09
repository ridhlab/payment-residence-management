import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import AddButton from "@/components/shared/button/add-button";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { numberColumns } from "@/helpers/table";
import { IOutcome } from "@/interfaces/entities/outcomes";
import { ROUTES } from "@/routes/list-route";
import { useGetOutcomeIndex } from "@/services/queries/outcomes";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";

export default function OutcomeIndexPage() {
    const query = useGetOutcomeIndex();
    const columns: ColumnsType<IOutcome> = [
        numberColumns(),
        {
            title: "Nama Pembayaran",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Pengeluaran",
            dataIndex: "fee",
            key: "fee",
        },
    ];
    return (
        <MainLayout
            title="List Pengeluaran"
            breadcrumbs={BREADCRUBMS.OUTCOMES.INDEX()}
        >
            <Card extra={<AddButton href={ROUTES.OUTCOME_CREATE} />}>
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
