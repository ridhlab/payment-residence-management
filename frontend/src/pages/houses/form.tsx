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
    IHouseStoreRequest,
    IHouseUpdateRequest,
} from "@/interfaces/requests/houses";
import { ROUTES } from "@/routes/list-route";
import {
    useHouseMutationStore,
    useHouseMutationUpdate,
} from "@/services/mutations/houses";
import { useGetHouseDefaultValueForForm } from "@/services/queries/houses";
import { Card, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<IHouseStoreRequest | IHouseUpdateRequest> = yup
    .object()
    .shape({
        code: yup.string().required(getRequiredMessage("Kode")),
    });

export default function FormHousePage({
    editPage = false,
}: {
    editPage?: boolean;
}) {
    const { id } = useParams();
    const { form, yupSync } = useFormUtility({ schema });

    const query = useGetHouseDefaultValueForForm(id);
    const navigate = useNavigate();

    const mutationUpdate = useHouseMutationUpdate(id, {
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil mengubah data rumah",
            });
            navigate(ROUTES.HOUSE_INDEX);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    const mutationStore = useHouseMutationStore({
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil menambahkan data rumah",
            });
            navigate(ROUTES.HOUSE_INDEX);
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
            title={editPage ? "Edit Rumah" : "Tambah Rumah"}
            breadcrumbs={
                editPage
                    ? BREADCRUBMS.HOUSE.EDIT(id)
                    : BREADCRUBMS.HOUSE.CREATE()
            }
        >
            <Card>
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Form
                        initialValues={{ ...query?.data?.data }}
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="code"
                            label="Kode Rumah"
                            rules={[yupSync]}
                        >
                            <Input placeholder="Input kode rumah" />
                        </Form.Item>
                        <ButtonAction
                            actions={[
                                <Button href={ROUTES.HOUSE_INDEX}>
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
