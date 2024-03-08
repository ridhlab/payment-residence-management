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
    IMonthlyFeeStoreRequest,
    IMonthlyFeeUpdateRequest,
} from "@/interfaces/requests/monthly-fees";
import { ROUTES } from "@/routes/list-route";
import {
    useMonthlyFeeMutationStore,
    useMonthlyFeeMutationUpdate,
} from "@/services/mutations/monthly-fees";
import { useGetMonthlyFeeDefaultValueForForm } from "@/services/queries/monthly-fees";
import { Card, Form, Input, InputNumber } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<
    IMonthlyFeeStoreRequest | IMonthlyFeeUpdateRequest
> = yup.object().shape({
    name: yup.string().required(getRequiredMessage("Nama")),
    fee: yup.number().required(getRequiredMessage("Biaya")),
});

export default function MonthlyFeeFormPage({
    editPage,
}: {
    editPage?: boolean;
}) {
    const { id } = useParams();
    const { form, yupSync } = useFormUtility({ schema });
    const query = useGetMonthlyFeeDefaultValueForForm(id);
    const navigate = useNavigate();

    const mutationStore = useMonthlyFeeMutationStore({
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil menambahkan iuran bulanan",
            });
            navigate(ROUTES.MONTHLY_FEE_INDEX);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    const mutationUpdate = useMonthlyFeeMutationUpdate(id, {
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil mengubah data iuran bulanan",
            });
            navigate(ROUTES.MONTHLY_FEE_INDEX);
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
                    ? BREADCRUBMS.MONTHLY_FEE.EDIT(id)
                    : BREADCRUBMS.MONTHLY_FEE.CREATE()
            }
            title={editPage ? "Edit Iuran Bulanan" : "Tambah Iuran Bulanan"}
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
                        <ButtonAction
                            actions={[
                                <Button href={ROUTES.MONTHLY_FEE_INDEX}>
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
