import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import AddButton from "@/components/shared/button/add-button";
import LoaderCenter from "@/components/shared/loader/loader-center";
import RowActionButtons from "@/components/shared/table/row-action-buttons";
import { getCurrencyId } from "@/helpers/currency";
import { parsingRoute } from "@/helpers/route";
import { numberColumns } from "@/helpers/table";
import { IMonthlyFee } from "@/interfaces/entities/monthly-fees";
import { ROUTES } from "@/routes/list-route";
import { useGetMonthlyFeeIndex } from "@/services/queries/monthly-fees";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";

export default function MonthlyFeeIndex() {
    const query = useGetMonthlyFeeIndex();
    const columns: ColumnsType<IMonthlyFee> = [
        numberColumns(),
        {
            title: "Nama",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Biaya",
            dataIndex: "fee",
            key: "fee",
            render: (val) => getCurrencyId(val),
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
                            href: parsingRoute(ROUTES.MONTHLY_FEE_EDIT, { id }),
                        },
                    ]}
                />
            ),
        },
    ];
    return (
        <MainLayout
            title="Daftar Iuran Bulanan"
            breadcrumbs={BREADCRUBMS.MONTHLY_FEE.INDEX()}
        >
            <Card extra={<AddButton href={ROUTES.MONTHLY_FEE_CREATE} />}>
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
