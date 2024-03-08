/* eslint-disable @typescript-eslint/ban-ts-comment */
import LoaderCenter from "@/components/shared/loader/loader-center";
import { PaymentType } from "@/enums/payment-type";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { IAddPaymentRequest } from "@/interfaces/requests/payments";
import { useAddPaymentsMutations } from "@/services/mutations/payments";
import {
    useGetMonthlyExpenseByIsNotPaidMonthly,
    useGetMonthlyExpenseByIsPaidMonthly,
} from "@/services/queries/monthly-expenses";
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
import { IMonthlyExpenseByIsPaidOrNotPaidData } from "@/interfaces/responses/monthly-expenses";

const schema = yup.object().shape({
    houseOccupantId: yup.number().required(),
    payments: yup.array().of(
        yup.object().shape({
            type: yup.mixed<PaymentType>().oneOf(Object.values(PaymentType)),
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
    paids: { type: PaymentType; id: number }[];
    notPaids: { type: PaymentType; id: number }[];
}) {
    const { id: houseOccupantId } = useParams();
    const queryMonthlyFee = useGetMonthlyFeeGetAll();
    const queryMonthlyExpensePaidMontly = useGetMonthlyExpenseByIsPaidMonthly();
    const queryMonthlyExpenseNotPaidMontly =
        useGetMonthlyExpenseByIsNotPaidMonthly();

    const dataMonthlyExpense = [
        ...(queryMonthlyExpensePaidMontly?.data?.data ?? []),
        ...(queryMonthlyExpenseNotPaidMontly?.data?.data ?? []),
    ];

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
        { id: number; type: PaymentType; months: number }[]
    >([]);

    const [valueFeeExpenseActive, setValueFeeExpenseActive] =
        React.useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const isLoading =
        queryMonthlyFee.isLoading ||
        queryMonthlyFee.isFetching ||
        queryMonthlyExpenseNotPaidMontly.isLoading ||
        queryMonthlyExpenseNotPaidMontly.isFetching ||
        queryMonthlyExpensePaidMontly.isLoading ||
        queryMonthlyExpensePaidMontly.isFetching;

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
                    // @ts-ignore
                    payments: payments.map(({ id, months, type }) => {
                        if (type === PaymentType.EXPENSE) {
                            return {
                                type: PaymentType.EXPENSE,
                                numberOfMonths: months,
                                monthlyExpenseId: id,
                            };
                        }
                        if (type === PaymentType.FEE) {
                            return {
                                type: PaymentType.FEE,
                                numberOfMonths: months,
                                monthlyFeeId: id,
                            };
                        }
                    }),
                };
                mutationAddPayments.mutate(payload);
            },
        });
    };

    const handleChangeNumberMonths = (id, val, type: PaymentType) => {
        setPayments(
            payments.map((item) => {
                if (item.id === id && type === item.type) {
                    return { ...item, months: val };
                }
                return item;
            })
        );
    };

    React.useEffect(() => {
        if (
            queryMonthlyExpenseNotPaidMontly.data?.data &&
            queryMonthlyExpenseNotPaidMontly.data?.data &&
            queryMonthlyExpensePaidMontly.data?.data
        ) {
            const _payments = [
                ...(queryMonthlyFee.data?.data.map(({ id }) => ({
                    type: PaymentType.FEE,
                    months: 1,
                    id,
                })) ?? []),
                ...(queryMonthlyExpensePaidMontly.data?.data.map(({ id }) => ({
                    type: PaymentType.EXPENSE,
                    months: 1,
                    id,
                })) ?? []),
            ].filter(({ id, type }) => {
                return notPaids?.find(
                    (paid) => paid.id === id && paid.type === type
                );
            });
            setPayments(_payments);
        }
    }, [
        queryMonthlyFee.data?.data,
        queryMonthlyExpenseNotPaidMontly.data?.data,
        queryMonthlyExpensePaidMontly.data?.data,
        notPaids,
    ]);

    const isPaid = (type, id) => {
        return !!paids?.find((paid) => paid.type === type && paid.id === id);
    };

    const optionsListPaymentAvailable = [
        ...(queryMonthlyFee.data?.data.map(({ fee, name, id }) => ({
            label: (
                <Space>
                    {`${name} - ${fee}`}
                    {isPaid(PaymentType.FEE, id) ? (
                        <Tag color="green">Lunas</Tag>
                    ) : (
                        ""
                    )}
                </Space>
            ),
            value: `fee-${id}`,
            disabled:
                isPaid(PaymentType.FEE, id) ||
                !!payments.find(
                    (payment) =>
                        payment.id === id && payment.type === PaymentType.FEE
                ),
        })) ?? []),
        ...(queryMonthlyExpensePaidMontly.data?.data.map(
            ({ fee, name, id }) => ({
                label: (
                    <Space>
                        {`${name} - ${fee}`}
                        {isPaid(PaymentType.EXPENSE, id) ? (
                            <Tag color="green">Lunas</Tag>
                        ) : (
                            ""
                        )}
                    </Space>
                ),
                value: `expense-${id}`,
                disabled:
                    isPaid(PaymentType.EXPENSE, id) ||
                    !!payments.find(
                        (payment) =>
                            payment.id === id &&
                            payment.type === PaymentType.EXPENSE
                    ),
            })
        ) ?? []),
        ...(queryMonthlyExpenseNotPaidMontly.data?.data.map(
            ({ fee, name, id }) => ({
                label: (
                    <Space>
                        {`${name} - ${fee}`}
                        {isPaid(PaymentType.EXPENSE, id) ? (
                            <Tag color="green">Lunas</Tag>
                        ) : (
                            ""
                        )}
                    </Space>
                ),
                value: `expense-${id}`,
                disabled:
                    isPaid(PaymentType.EXPENSE, id) ||
                    !!payments.find(
                        (payment) =>
                            payment.id === id &&
                            payment.type === PaymentType.EXPENSE
                    ),
            })
        ) ?? []),
    ];

    const paymentsNode = payments?.map((_payment) => {
        const paymentActive:
            | IMonthlyFeeGetAllData
            | IMonthlyExpenseByIsPaidOrNotPaidData =
            _payment.type === PaymentType.FEE
                ? queryMonthlyFee?.data?.data?.find(
                      (data) => data.id === _payment.id
                  )
                : dataMonthlyExpense.find((data) => data.id === _payment.id);
        return (
            <TagItemPayment
                key={
                    _payment.type === PaymentType.FEE
                        ? "monthly-fee-" + paymentActive.id
                        : "monthly-expense-" + paymentActive.id
                }
                color={
                    _payment.type === PaymentType.FEE ||
                    (_payment.type === PaymentType.EXPENSE &&
                        // @ts-ignore
                        paymentActive?.isPaidMonthly)
                        ? "red"
                        : undefined
                }
                fee={paymentActive.fee}
                name={paymentActive.name}
                type={_payment.type}
                handleChange={(val) =>
                    handleChangeNumberMonths(
                        paymentActive.id,
                        val,
                        PaymentType.FEE
                    )
                }
                handleDelete={() =>
                    setPayments(
                        payments.filter(
                            (data) =>
                                !(
                                    data.id === paymentActive.id &&
                                    data.type === _payment.type
                                )
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
