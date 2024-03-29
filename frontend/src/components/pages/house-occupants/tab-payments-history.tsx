import AddButton from "@/components/shared/button/add-button";
import ModalAddPayments from "./modal-add-payments";
import React from "react";
import { Card, Space, Tabs, Tag, Typography } from "antd";
import {
    useGetPaymentByHouseOccupantId,
    useGetPaymentNotPaidByHouseOccupant,
    useGetPaymentPaidByHouseOccupant,
} from "@/services/queries/payments";
import { useParams } from "react-router-dom";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { getCurrencyId } from "@/helpers/currency";
import dayjs from "dayjs";

export default function TabPaymentHistory({
    isContract,
    isContractNotStart,
}: {
    isContract: boolean;
    isContractNotStart: boolean;
}) {
    const { id: houseOccupantId } = useParams();
    const [openModalAddPayment, setOpenModalAddPayment] = React.useState(false);

    const queryPaidAll = useGetPaymentByHouseOccupantId(houseOccupantId);

    const queryNotPaidPayment =
        useGetPaymentNotPaidByHouseOccupant(houseOccupantId);

    const queryPaidPayment = useGetPaymentPaidByHouseOccupant(houseOccupantId);

    const historyContent =
        queryPaidAll.isLoading || queryPaidAll.isFetching ? (
            <LoaderCenter />
        ) : queryPaidAll.data?.data?.length ? (
            <Space direction="vertical" style={{ width: "100%" }}>
                {queryPaidAll?.data?.data.map(
                    ({ id, paymentName, paymentDate, paymentForDate, fee }) => (
                        <Tag key={id} color="green" style={{ width: "100%" }}>
                            <p>Nama Pembayaran : {paymentName}</p>
                            <p>Iuran Bulanan</p>
                            <p>Biaya : {getCurrencyId(fee)}</p>
                            <p>Pembayaran bulan : {paymentForDate}</p>
                            <p>
                                Dibayar pada :{" "}
                                {dayjs(paymentDate).format(
                                    "YYYY/MM/DD, HH:mm:ss"
                                )}
                            </p>
                        </Tag>
                    )
                )}
            </Space>
        ) : (
            <Typography.Text>
                Penghuni ini belum melakukan pembayaran sama sekali
            </Typography.Text>
        );

    const paidOffContent =
        queryPaidPayment.isLoading || queryPaidPayment.isFetching ? (
            <LoaderCenter />
        ) : queryPaidPayment?.data?.data?.length ? (
            <Space direction="vertical" style={{ width: "100%" }}>
                {queryPaidPayment?.data?.data.map(
                    ({ id, name, paymentDate, fee }) => (
                        <Tag key={id} color="green" style={{ width: "100%" }}>
                            <p>Nama Pembayaran : {name}</p>
                            <p>Iuran Bulanan</p>
                            <p>Biaya : {getCurrencyId(fee)}</p>
                            <p>
                                Tanggal Pembayaran :{" "}
                                {dayjs(paymentDate).format(
                                    "YYYY/MM/DD, HH:mm:ss"
                                )}
                            </p>
                        </Tag>
                    )
                )}
            </Space>
        ) : (
            <Typography.Text>
                Belum ada pembayaran yang lunas bulan ini
            </Typography.Text>
        );

    const notPaidContent =
        queryNotPaidPayment.isLoading || queryNotPaidPayment.isFetching ? (
            <LoaderCenter />
        ) : queryNotPaidPayment.data?.data?.length ? (
            <Space direction="vertical" style={{ width: "100%" }}>
                {queryNotPaidPayment?.data?.data.map(
                    ({ id, name, fee, lastPaidMonth }) => (
                        <Tag key={id} color="red" style={{ width: "100%" }}>
                            <p>Nama Pembayaran : {name}</p>
                            <p>Iuran Bulanan</p>
                            <p>Biaya : {getCurrencyId(fee)}</p>
                            <p>
                                Bulan Pembayaran Terakhir :{" "}
                                {lastPaidMonth ?? "-"}
                            </p>
                        </Tag>
                    )
                )}
            </Space>
        ) : (
            <Typography.Text>
                Pembayaran pada bulan ini sudah lunas semua
            </Typography.Text>
        );

    return (
        <>
            <Card
                title="Riwayat Pembayaran"
                extra={
                    !(isContract && isContractNotStart) ? (
                        <AddButton onClick={() => setOpenModalAddPayment(true)}>
                            Tambah Pembayaran
                        </AddButton>
                    ) : undefined
                }
            >
                {isContract && isContractNotStart ? (
                    <Typography.Text>
                        Masa kontrak belum dimulai
                    </Typography.Text>
                ) : (
                    <Tabs
                        items={[
                            {
                                key: "belum-lunas",
                                label: "Belum Lunas Bulan Ini",
                                children: notPaidContent,
                            },
                            {
                                label: "Lunas Bulan Ini",
                                key: "lunas",
                                children: paidOffContent,
                            },
                            {
                                label: "Histori Pembayaran",
                                key: "history",
                                children: historyContent,
                            },
                        ]}
                    />
                )}
            </Card>
            <ModalAddPayments
                refetchHistoricalPayment={() => {
                    queryNotPaidPayment.refetch();
                    queryPaidPayment.refetch();
                    queryPaidAll.refetch();
                }}
                open={openModalAddPayment}
                setOpen={setOpenModalAddPayment}
                paids={queryPaidPayment.data?.data.map(
                    ({ id, lastPaidMonth }) => ({
                        id,
                        lastPaidMonth,
                    })
                )}
                notPaids={queryNotPaidPayment.data?.data.map(
                    ({ id, lastPaidMonth }) => ({
                        id,
                        lastPaidMonth,
                    })
                )}
            />
        </>
    );
}
