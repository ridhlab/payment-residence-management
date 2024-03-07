import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import AddButton from "@/components/shared/button/add-button";
import LoaderCenter from "@/components/shared/loader/loader-center";
import RowActionButtons from "@/components/shared/table/row-action-buttons";
import { getCurrencyId } from "@/helpers/currency";
import { parsingRoute } from "@/helpers/route";
import { numberColumns } from "@/helpers/table";
import { IMonthlyExpense } from "@/interfaces/entities/monthly-expenses";
import { ROUTES } from "@/routes/list-route";
import { useGetMonthlyExpenseIndex } from "@/services/queries/monthly-expenses";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";

export default function MonthlyExpenseIndex() {
    const query = useGetMonthlyExpenseIndex();
    const columns: ColumnsType<IMonthlyExpense> = [
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
            title: "Bayar Tiap Bulan",
            dataIndex: "isPaidMonthly",
            key: "isPaidMonthly",
            render: (val) => (val ? "Iya" : "Tidak"),
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
                            href: parsingRoute(ROUTES.MONTHLY_EXPENSE_EDIT, {
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
            title="Daftar Pengeluaran Bulanan"
            breadcrumbs={BREADCRUBMS.MONTHLY_EXPENSE.INDEX()}
        >
            <Card extra={<AddButton href={ROUTES.MONTHLY_EXPENSE_CREATE} />}>
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
