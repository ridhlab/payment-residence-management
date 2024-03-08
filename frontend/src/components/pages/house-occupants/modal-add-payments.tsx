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
import { Form, Modal, Select, Space } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import TagItemPayment from "./tag-item-payment";
import Button from "@/components/shared/button/button";
import { PlusOutlined } from "@ant-design/icons";
import ButtonAction from "@/components/shared/form/button-actions";
import * as yup from "yup";
import { useFormUtility } from "@/hooks/useFormUtility";

const schema = yup.object().shape({
    houseOccupantId: yup.number().required(),
    payments: yup.array().of(
        yup.object().shape({
            type: yup.mixed<PaymentType>().oneOf(Object.values(PaymentType)),
            monthlyFeeId: yup.number().optional(),
            monthlyExpenseId: yup.number().optional(),
            numberOfMonths: yup.number().required(),
        })
    ),
});

export default function ModalAddPayments({
    open,
    setOpen,
    refetchHistoricalPayment,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetchHistoricalPayment: () => void;
}) {
    const { id: houseOccupantId } = useParams();
    const queryMonthlyFee = useGetMonthlyFeeGetAll();
    const queryMonthlyExpensePaidMontly = useGetMonthlyExpenseByIsPaidMonthly();
    const queryMonthlyExpenseNotPaidMontly =
        useGetMonthlyExpenseByIsNotPaidMonthly();

    const mutationAddPayments = useAddPaymentsMutations({
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil tambah penghuni rumah",
            });
            setOpen(false);
            window.location.reload();
            refetchHistoricalPayment();
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    // @ts-ignore
    const { form } = useFormUtility<IAddPaymentRequest>(schema);

    const [numberOfMonths, setNumberOfMonths] = React.useState<
        { id: number; type: PaymentType; months: number }[]
    >([]);

    const [montlyExpenseNotPaidSelected, setMontlyExpenseNotPaidSelected] =
        React.useState([]);
    const [valueExpenseNotPaidActive, setValueExpenseNotPaidActive] =
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

    const handleClickAddMonthlyExpense = () => {
        setMontlyExpenseNotPaidSelected((prev) => [
            ...prev,
            valueExpenseNotPaidActive,
        ]);
        setNumberOfMonths((prev) => [
            ...prev,
            {
                type: PaymentType.EXPENSE,
                months: 1,
                // eslint-disable-next-line no-unsafe-optional-chaining
                id: (queryMonthlyExpenseNotPaidMontly.data?.data.find(
                    ({ id }) => valueExpenseNotPaidActive === id
                )).id,
            },
        ]);
        setValueExpenseNotPaidActive(null);
    };

    const onFinish = () => {
        modalConfirm({
            onOk: async () => {
                const payload: IAddPaymentRequest = {
                    houseOccupantId: parseInt(houseOccupantId),
                    payments: numberOfMonths.map(({ id, months, type }) => {
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

    const deleteExpense = (expenseId) => {
        setNumberOfMonths(
            numberOfMonths.filter(
                ({ id, type }) =>
                    !(id === expenseId && type === PaymentType.EXPENSE)
            )
        );
        setMontlyExpenseNotPaidSelected(
            montlyExpenseNotPaidSelected.filter((id) => expenseId !== id)
        );
    };

    const handleChangeNumberMonths = (id, val, type: PaymentType) => {
        setNumberOfMonths(
            numberOfMonths.map((item) => {
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
            const _numberOfMonths = [
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
            ];
            setNumberOfMonths(_numberOfMonths);
        }
    }, [
        queryMonthlyFee.data?.data,
        queryMonthlyExpenseNotPaidMontly.data?.data,
        queryMonthlyExpensePaidMontly.data?.data,
    ]);

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
                            {queryMonthlyFee.data?.data.map(
                                ({ name, fee, id }) => (
                                    <TagItemPayment
                                        key={"monthly-fee-" + id}
                                        color="red"
                                        fee={fee}
                                        name={name}
                                        type="fee"
                                        handleChange={(val) =>
                                            handleChangeNumberMonths(
                                                id,
                                                val,
                                                PaymentType.FEE
                                            )
                                        }
                                    />
                                )
                            )}
                            {queryMonthlyExpensePaidMontly.data?.data.map(
                                ({ fee, name, id }) => (
                                    <TagItemPayment
                                        key={"monthly-expense-" + id}
                                        color="red"
                                        fee={fee}
                                        name={name}
                                        type="expense"
                                        handleChange={(val) =>
                                            handleChangeNumberMonths(
                                                id,
                                                val,
                                                PaymentType.EXPENSE
                                            )
                                        }
                                    />
                                )
                            )}
                            {montlyExpenseNotPaidSelected.map((id) => {
                                const monthlyExpense =
                                    queryMonthlyExpenseNotPaidMontly.data?.data.find(
                                        (expense) => id === expense.id
                                    );
                                return (
                                    <TagItemPayment
                                        key={id}
                                        fee={monthlyExpense.fee}
                                        name={monthlyExpense.name}
                                        type="expense"
                                        expenseNotMonthly
                                        handleDelete={() => deleteExpense(id)}
                                        handleChange={(val) =>
                                            handleChangeNumberMonths(
                                                id,
                                                val,
                                                PaymentType.EXPENSE
                                            )
                                        }
                                    />
                                );
                            })}
                        </Space>
                        <Space>
                            <Select
                                size="small"
                                placeholder="Pilih Pengeluaran Bulanan"
                                options={queryMonthlyExpenseNotPaidMontly.data?.data.map(
                                    ({ fee, name, id }) => ({
                                        label: `${name} - ${fee}`,
                                        value: id,
                                        disabled:
                                            montlyExpenseNotPaidSelected.includes(
                                                id
                                            ),
                                    })
                                )}
                                allowClear
                                onClear={() =>
                                    setValueExpenseNotPaidActive(null)
                                }
                                value={valueExpenseNotPaidActive}
                                onChange={(val) =>
                                    setValueExpenseNotPaidActive(val)
                                }
                            />
                            <Button
                                icon={<PlusOutlined />}
                                size="small"
                                disabled={!valueExpenseNotPaidActive}
                                onClick={handleClickAddMonthlyExpense}
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
