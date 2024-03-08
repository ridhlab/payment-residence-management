import AddButton from "@/components/shared/button/add-button";
import ModalAddPayments from "./modal-add-payments";
import React from "react";
import { Card, Space, Tabs, Tag } from "antd";
import { useGetPaymentByHouseOccupantId } from "@/services/queries/payments";
import { useParams } from "react-router-dom";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { PaymentType } from "@/enums/payment-type";

export default function TabPaymentHistory() {
    const { id: houseOccupantId } = useParams();
    const [openModalAddPayment, setOpenModalAddPayment] = React.useState(false);

    const queryPaidOff = useGetPaymentByHouseOccupantId(houseOccupantId);

    const paidOffContent =
        queryPaidOff.isLoading || queryPaidOff.isFetching ? (
            <LoaderCenter />
        ) : (
            <Space direction="vertical" style={{ width: "100%" }}>
                {queryPaidOff?.data?.data.map(
                    ({
                        paymentDate,
                        paymentForDate,
                        id,
                        paymentName,
                        paymentType,
                    }) => (
                        <Tag key={id} color="green" style={{ width: "100%" }}>
                            <p>Nama Pembayaran : {paymentName}</p>
                            <p>
                                Tipe Pembayaran :{" "}
                                {paymentType === PaymentType.FEE
                                    ? "Iuran Bulanan"
                                    : "Pengeluaran Bulanan"}
                            </p>
                            <p>Tanggal Pembayaran : {paymentDate}</p>
                            <p>Pembayaran Untuk Bulan : {paymentForDate}</p>
                        </Tag>
                    )
                )}
            </Space>
        );

    return (
        <>
            <Card
                title="Riwayat Pembayaran"
                extra={
                    <AddButton onClick={() => setOpenModalAddPayment(true)}>
                        Tambah Pembayaran
                    </AddButton>
                }
            >
                <Tabs
                    items={[
                        { key: "belum-lunas", label: "Belum Lunas" },
                        {
                            label: "Lunas",
                            key: "lunas",
                            children: paidOffContent,
                        },
                    ]}
                />
            </Card>
            <ModalAddPayments
                refetchHistoricalPayment={() => queryPaidOff.refetch()}
                open={openModalAddPayment}
                setOpen={setOpenModalAddPayment}
            />
        </>
    );
}
