import { BREADCRUBMS } from "@/common/breadcrumbs";
import MainLayout from "@/components/layouts/main";
import Button from "@/components/shared/button/button";
import ButtonAction from "@/components/shared/form/button-actions";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { getRequiredMessage } from "@/helpers/form";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { digitOnlyRegex } from "@/helpers/regex";
import { parsingRoute } from "@/helpers/route";
import { useFormUtility } from "@/hooks/useFormUtility";
import {
    IOccupantStoreRequest,
    IOccupantUpdateRequest,
} from "@/interfaces/requests/occupants";
import { IBaseResponse } from "@/interfaces/responses/base";
import { ENDPOINT_API, ROUTES } from "@/routes/list-route";
import { axiosInstance } from "@/services/apis";
import {
    useOccupantMutationStore,
    useOccupantMutationUpdate,
} from "@/services/mutations/occupants";
import { useGetOccupantDefaultValueForForm } from "@/services/queries/occupants";
import { Card, Form, Input, Progress, Radio, Upload } from "antd";
import { UploadRequestOption } from "rc-upload/lib/interface";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<IOccupantStoreRequest | IOccupantUpdateRequest> =
    yup.object().shape({
        fullname: yup.string().required(getRequiredMessage("Nama Lengkap")),
        phone: yup
            .string()
            .matches(digitOnlyRegex, "Format no telepon tidak sesuai")
            .min(9, "Minimal 9 digit")
            .max(14, "Maksimal 14 digit"),
        isMarried: yup
            .boolean()
            .required(getRequiredMessage("Status Pernikahan")),
    });

export default function OccupantFormPage({
    editPage = false,
}: {
    editPage?: boolean;
}) {
    const { id } = useParams();
    const { form, yupSync } = useFormUtility({ schema });
    const query = useGetOccupantDefaultValueForForm(id);
    const navigate = useNavigate();
    const [progress, setProgress] = React.useState(0);

    const mutationStore = useOccupantMutationStore({
        onSuccess: (data: IBaseResponse<any>) => {
            prompNotification({
                method: "success",
                message:
                    "Berhasil menambahkan data penghuni, Silahkan upload identitas diri Anda",
            });
            navigate(parsingRoute(ROUTES.OCCUPANT_EDIT, { id: data.data.id }));
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    const mutationUpdate = useOccupantMutationUpdate(id, {
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil mengubah data penghuni",
            });
            navigate(ROUTES.OCCUPANT_INDEX);
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

    const customRequest = async (options: UploadRequestOption<any>) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: (event) => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            },
        };
        fmData.append("identity_card", file);
        try {
            await axiosInstance.post(
                parsingRoute(ENDPOINT_API.OCCUPANTS.UPLOAD_IDENTITY_CARD, {
                    id,
                }),
                fmData,
                config
            );
            onSuccess("Upload successfully");
            prompNotification({
                message: "Sukses upload KTP",
                method: "success",
            });
            query.refetch();
        } catch (err) {
            onError(new Error("Upload failed"));
            prompNotification({
                message: err as string,
                method: "error",
            });
        }
    };

    return (
        <MainLayout
            title={editPage ? "Edit Penghuni" : "Tambah Penghuni"}
            breadcrumbs={
                editPage
                    ? BREADCRUBMS.OCCUPANT.EDIT(id)
                    : BREADCRUBMS.OCCUPANT.CREATE()
            }
        >
            <Card>
                {query.isLoading || query.isFetching ? (
                    <LoaderCenter />
                ) : (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        initialValues={{
                            ...query?.data?.data,
                            isMarried: !!query?.data?.data.isMarried,
                        }}
                    >
                        <Form.Item
                            label="Nama Lengkap"
                            name="fullname"
                            rules={[yupSync]}
                        >
                            <Input placeholder="Input nama lengkap" />
                        </Form.Item>
                        <Form.Item
                            label="No Telepon"
                            name="phone"
                            rules={[yupSync]}
                        >
                            <Input placeholder="Input no telepon" />
                        </Form.Item>
                        <Form.Item
                            label="Status Menikah"
                            name="isMarried"
                            rules={[yupSync]}
                        >
                            <Radio.Group>
                                <Radio value={true}>Menikah</Radio>
                                <Radio value={false}>Lajang</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {editPage ? (
                            <>
                                <Upload
                                    maxCount={1}
                                    customRequest={customRequest}
                                    defaultFileList={
                                        query.data.data.identityCardUrl
                                            ? [
                                                  {
                                                      url: query.data.data
                                                          .identityCardUrl,
                                                      name: query.data.data
                                                          .identityCardUrl,
                                                      uid: query.data.data
                                                          .identityCardUrl,
                                                  },
                                              ]
                                            : undefined
                                    }
                                    listType="picture-card"
                                    accept="image/jpeg, image/png, image/jpg"
                                >
                                    Upload KTP
                                </Upload>

                                {progress > 0 ? (
                                    <Progress percent={progress} />
                                ) : null}
                            </>
                        ) : null}

                        <ButtonAction
                            actions={[
                                <Button href={ROUTES.OCCUPANT_INDEX}>
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
