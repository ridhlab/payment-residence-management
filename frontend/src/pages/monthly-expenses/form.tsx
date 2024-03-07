import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import Button from "@/components/shared/button/button";
import ButtonAction from "@/components/shared/form/button-actions";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { getRequiredMessage } from "@/helpers/form";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { useFormUtility } from "@/hooks/useFormUtility";
import {
    IMonthlyExpenseStoreRequest,
    IMonthlyExpenseUpdateRequest,
} from "@/interfaces/requests/monthly-expenses";
import { ROUTES } from "@/routes/list-route";
import {
    useMonthlyExpenseMutationStore,
    useMonthlyExpenseMutationUpdate,
} from "@/services/mutations/monthly-expenses";
import { useGetMonthlyExpenseDefaultValueForForm } from "@/services/queries/monthly-expenses";
import { Card, Form, Input, InputNumber, Radio } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<
    IMonthlyExpenseStoreRequest | IMonthlyExpenseUpdateRequest
> = yup.object().shape({
    name: yup.string().required(getRequiredMessage("Nama")),
    fee: yup.number().required(getRequiredMessage("Biaya")),
    isPaidMonthly: yup.boolean().required("Dibayar tiap bulan"),
});

export default function MonthlyExpenseFormPage({
    editPage,
}: {
    editPage?: boolean;
}) {
    const { id } = useParams();
    const { form, yupSync } = useFormUtility({ schema });
    const query = useGetMonthlyExpenseDefaultValueForForm(id);
    const navigate = useNavigate();

    const mutationStore = useMonthlyExpenseMutationStore({
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil menambahkan pengeluaran bulanan",
            });
            navigate(ROUTES.MONTHLY_EXPENSE_INDEX);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    const mutationUpdate = useMonthlyExpenseMutationUpdate(id, {
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil mengubah data pengeluaran bulanan",
            });
            navigate(ROUTES.MONTHLY_EXPENSE_INDEX);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    const onFinish = () => {
        modalConfirm({
            onOk: async () => {
                await form.validateFields();
                const payload = form.getFieldsValue();
                editPage
                    ? mutationUpdate.mutate(payload)
                    : mutationStore.mutate(payload);
            },
        });
    };

    return (
        <MainLayout
            breadcrumbs={
                editPage
                    ? BREADCRUBMS.MONTHLY_EXPENSE.EDIT(id)
                    : BREADCRUBMS.MONTHLY_EXPENSE.CREATE()
            }
            title={
                editPage
                    ? "Edit Pengeluaran Bulanan"
                    : "Tambah Pengeluaran Bulanan"
            }
        >
            <Card>
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        initialValues={{ ...query?.data?.data }}
                    >
                        <Form.Item label="Nama" name="name" rules={[yupSync]}>
                            <Input placeholder="Input nama" />
                        </Form.Item>
                        <Form.Item label="Biaya" name="fee" rules={[yupSync]}>
                            <InputNumber
                                prefix={"Rp "}
                                style={{ width: "100%" }}
                                placeholder="Input biaya"
                                type="number"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dibayar Tiap Bulan"
                            name="isPaidMonthly"
                            rules={[yupSync]}
                        >
                            <Radio.Group>
                                <Radio value={true}>Iya</Radio>
                                <Radio value={false}>Tidak</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <ButtonAction
                            actions={[
                                <Button href={ROUTES.MONTHLY_EXPENSE_INDEX}>
                                    Batal
                                </Button>,
                                <Button type="primary" htmlType="submit">
                                    Simpan
                                </Button>,
                            ]}
                        />
                    </Form>
                )}
            </Card>
        </MainLayout>
    );
}
