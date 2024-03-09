/* eslint-disable @typescript-eslint/ban-ts-comment */
import LoaderCenter from "@/components/shared/loader/loader-center";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { IAddPaymentRequest } from "@/interfaces/requests/payments";
import { useAddPaymentsMutations } from "@/services/mutations/payments";
import { useGetMonthlyFeeGetAll } from "@/services/queries/monthly-fees";
import { Form, Modal, Select, Space, Tag } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import TagItemPayment from "./tag-item-payment";
import Button from "@/components/shared/button/button";
import { PlusOutlined } from "@ant-design/icons";
import ButtonAction from "@/components/shared/form/button-actions";
import * as yup from "yup";
import { useFormUtility } from "@/hooks/useFormUtility";
import { IMonthlyFeeGetAllData } from "@/interfaces/responses/monthly-fees";

const schema = yup.object().shape({
    houseOccupantId: yup.number().required(),
    payments: yup.array().of(
        yup.object().shape({
            monthlyFeeId: yup.number().optional(),
            monthlyExpenseId: yup.number().optional(),
            payments: yup.number().required(),
        })
    ),
});

export default function ModalAddPayments({
    open,
    setOpen,
    refetchHistoricalPayment,
    notPaids,
    paids,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetchHistoricalPayment: () => void;
    paids: { id: number }[];
    notPaids: { id: number }[];
}) {
    const { id: houseOccupantId } = useParams();
    const queryMonthlyFee = useGetMonthlyFeeGetAll();

    const mutationAddPayments = useAddPaymentsMutations({
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil tambah penghuni rumah",
            });
            setOpen(false);
            refetchHistoricalPayment();
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    // @ts-ignore
    const { form } = useFormUtility<IAddPaymentRequest>(schema);

    const [payments, setPayments] = React.useState<
        { id: number; months: number }[]
    >([]);

    const [valueFeeExpenseActive, setValueFeeExpenseActive] =
        React.useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const isLoading = queryMonthlyFee.isLoading || queryMonthlyFee.isFetching;

    const handleClickAdd = () => {
        setPayments((prev) => [
            ...prev,
            {
                type: valueFeeExpenseActive.split("-")[0],
                months: 1,
                // eslint-disable-next-line no-unsafe-optional-chaining
                id: parseInt(valueFeeExpenseActive.split("-")[1]),
            },
        ]);
        setValueFeeExpenseActive(null);
    };

    const onFinish = () => {
        modalConfirm({
            onOk: async () => {
                const payload: IAddPaymentRequest = {
                    houseOccupantId: parseInt(houseOccupantId),

                    payments: payments.map(({ id, months }) => {
                        return {
                            numberOfMonths: months,
                            monthlyFeeId: id,
                        };
                    }),
                };
                mutationAddPayments.mutate(payload);
            },
        });
    };

    const handleChangeNumberMonths = (id, val) => {
        setPayments(
            payments.map((item) => {
                if (item.id === id) {
                    return { ...item, months: val };
                }
                return item;
            })
        );
    };

    React.useEffect(() => {
        const _payments = [
            ...(queryMonthlyFee.data?.data.map(({ id }) => ({
                months: 1,
                id,
            })) ?? []),
        ].filter(({ id }) => {
            return notPaids?.find((paid) => paid.id === id);
        });
        setPayments(_payments);
    }, [queryMonthlyFee.data?.data, notPaids]);

    const isPaid = (id) => {
        return !!paids?.find((paid) => paid.id === id);
    };

    const optionsListPaymentAvailable = [
        ...(queryMonthlyFee.data?.data.map(({ fee, name, id }) => ({
            label: (
                <Space>
                    {`${name} - ${fee}`}
                    {isPaid(id) ? <Tag color="green">Lunas</Tag> : ""}
                </Space>
            ),
            value: `fee-${id}`,
            disabled:
                isPaid(id) || !!payments.find((payment) => payment.id === id),
        })) ?? []),
    ];

    const paymentsNode = payments?.map((_payment) => {
        const paymentActive: IMonthlyFeeGetAllData =
            queryMonthlyFee?.data?.data.find((data) => data.id === _payment.id);
        return (
            <TagItemPayment
                key={paymentActive.id}
                color={"red"}
                fee={paymentActive.fee}
                name={paymentActive.name}
                handleChange={(val) =>
                    handleChangeNumberMonths(paymentActive.id, val)
                }
                handleDelete={() =>
                    setPayments(
                        payments.filter(
                            (data) => !(data.id === paymentActive.id)
                        )
                    )
                }
            />
        );
    });

    return (
        <Modal
            onCancel={handleClose}
            centered
            open={open}
            title="Tambah Pembayaran"
            footer={false}
        >
            <Form form={form} onFinish={onFinish}>
                {isLoading ? (
                    <LoaderCenter />
                ) : (
                    <Space
                        direction="vertical"
                        style={{ width: "100%" }}
                        size="large"
                    >
                        <Space direction="vertical" style={{ width: "100%" }}>
                            {paymentsNode}
                        </Space>
                        <Space>
                            <Select
                                size="small"
                                placeholder="Pilih Nama Iura/Pengeluaran"
                                options={optionsListPaymentAvailable}
                                allowClear
                                onClear={() => setValueFeeExpenseActive(null)}
                                value={valueFeeExpenseActive}
                                onChange={(val) =>
                                    setValueFeeExpenseActive(val)
                                }
                            />
                            <Button
                                icon={<PlusOutlined />}
                                size="small"
                                disabled={!valueFeeExpenseActive}
                                onClick={handleClickAdd}
                            >
                                Tambah
                            </Button>
                        </Space>
                        <ButtonAction
                            actions={[
                                <Button key="cancel" onClick={handleClose}>
                                    Batal
                                </Button>,
                                <Button
                                    key="save"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Simpan
                                </Button>,
                            ]}
                        />
                    </Space>
                )}
            </Form>
        </Modal>
    );
}
