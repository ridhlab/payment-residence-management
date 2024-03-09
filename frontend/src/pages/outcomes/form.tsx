import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import Button from "@/components/shared/button/button";
import ButtonAction from "@/components/shared/form/button-actions";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { getCurrencyId } from "@/helpers/currency";
import { getRequiredMessage } from "@/helpers/form";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { useFormUtility } from "@/hooks/useFormUtility";
import { IAddOutcomeRequest } from "@/interfaces/requests/outcomes";
import { ROUTES } from "@/routes/list-route";
import { useAddOutcomeMutations } from "@/services/mutations/outcomes";
import { useGetBalanceAllTimes } from "@/services/queries/report-payments";
import { Card, Flex, Form, Input, InputNumber, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<IAddOutcomeRequest> = yup.object().shape({
    name: yup.string().required(getRequiredMessage("Nama pengeluaran")),
    fee: yup.number().required(getRequiredMessage("Pengeluaran")),
});

export default function OutcomeFormPage() {
    const { form, yupSync } = useFormUtility({ schema });
    const navigate = useNavigate();

    const queryGetBalance = useGetBalanceAllTimes();

    const mutation = useAddOutcomeMutations({
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil menambahkan pengeluaran",
            });
            navigate(ROUTES.OUTCOMES_INDEX);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    const onFinish = () => {
        modalConfirm({
            onOk: async () => {
                await form.validateFields();
                const payload = form.getFieldsValue();
                mutation.mutate(payload);
            },
        });
    };

    return (
        <MainLayout
            title="Tambah Pengeluaran"
            breadcrumbs={BREADCRUBMS.OUTCOMES.CREATE()}
        >
            <Card>
                {queryGetBalance?.isLoading || queryGetBalance?.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Flex justify="end">
                            <Typography.Text>
                                Uang tersedia :{" "}
                                {getCurrencyId(
                                    queryGetBalance?.data?.data?.balance
                                )}
                            </Typography.Text>
                        </Flex>
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item
                                label="Nama Pengeluaran"
                                name="name"
                                rules={[yupSync]}
                            >
                                <Input placeholder="Input nama pengeluaran" />
                            </Form.Item>
                            <Form.Item
                                label="Pengeluaran"
                                name="fee"
                                rules={[
                                    yupSync,
                                    {
                                        max: queryGetBalance?.data?.data
                                            .balance,
                                        type: "number",
                                        message:
                                            "Pengeluaran melebihi batas uang yang tersedia",
                                    },
                                ]}
                            >
                                <InputNumber
                                    prefix={"Rp "}
                                    placeholder="Input biaya pengeluaran"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                            <ButtonAction
                                actions={[
                                    <Button href={ROUTES.OUTCOMES_INDEX}>
                                        Batal
                                    </Button>,
                                    <Button type="primary" htmlType="submit">
                                        Simpan
                                    </Button>,
                                ]}
                            />
                        </Form>
                    </Space>
                )}
            </Card>
        </MainLayout>
    );
}
