/* eslint-disable react-hooks/exhaustive-deps */
import { BREADCRUBMS } from "@/common/breadcrumbs";
import { occupantStatusOptions } from "@/common/select-options";
import MainLayout from "@/components/layouts/main";
import ButtonAction from "@/components/shared/form/button-actions";
import LoaderCenter from "@/components/shared/loader/loader-center";
import { OccupantStatus } from "@/enums/occupant-status";
import { getRequiredMessage } from "@/helpers/form";
import { modalConfirm } from "@/helpers/modal-confirm";
import { prompNotification } from "@/helpers/notification";
import { useFetchDropdownSearch } from "@/hooks/useFetchDropdown";
import { useFormUtility } from "@/hooks/useFormUtility";
import { IAddOccupantRequest } from "@/interfaces/requests/house-occupants";
import { ROUTES } from "@/routes/list-route";
import { useAddHouseOccupantMutation } from "@/services/mutations/house-occupants";
import { useGetHouseDropdownNotOccupied } from "@/services/queries/houses";
import { useGetOccupantDropdownNotOccupy } from "@/services/queries/occupants";
import { Button, Card, Form, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema: yup.ObjectSchema<IAddOccupantRequest> = yup.object().shape({
    occupantId: yup.number().required(getRequiredMessage("Penghuni")),
    houseId: yup.number().required(getRequiredMessage("Rumah")),
    occupantStatus: yup
        .mixed<OccupantStatus>()
        .oneOf(Object.values(OccupantStatus)),
});

export default function HouseOccupantFormPage() {
    const { form, yupSync } = useFormUtility({ schema });
    const navigate = useNavigate();

    const {
        searchValue: searchValueOccupant,
        selectOptions: selectOptionsOccupant,
        setSearchValue: setSearchValueOccupant,
        setSelectOptions: setSelectOptionsOccupant,
    } = useFetchDropdownSearch();

    const {
        searchValue: searchValueHouse,
        selectOptions: selectOptionsHouse,
        setSearchValue: setSearchValueHouse,
        setSelectOptions: setSelectOptionsHouse,
    } = useFetchDropdownSearch();

    const queryDropdownOccupant =
        useGetOccupantDropdownNotOccupy(searchValueOccupant);
    const queryDropdownHouse = useGetHouseDropdownNotOccupied(searchValueHouse);

    const mutationAddHouseOccupant = useAddHouseOccupantMutation({
        onSuccess: () => {
            prompNotification({
                method: "success",
                message: "Berhasil tambah penghuni rumah",
            });
            navigate(ROUTES.HOUSE_OCCUPANT_INDEX);
        },
        onError: (error) =>
            prompNotification({ message: error.message, method: "error" }),
    });

    const onFinish = () => {
        modalConfirm({
            onOk: async () => {
                await form.validateFields();
                const payload = form.getFieldsValue();
                mutationAddHouseOccupant.mutate(payload);
            },
        });
    };

    React.useEffect(() => {
        if (queryDropdownOccupant?.data?.data) {
            setSelectOptionsOccupant(queryDropdownOccupant.data.data);
        }
    }, [queryDropdownOccupant?.data?.data]);

    React.useEffect(() => {
        if (queryDropdownHouse?.data?.data) {
            setSelectOptionsHouse(queryDropdownHouse.data.data);
        }
    }, [queryDropdownHouse?.data?.data]);

    // const isLoading =
    //     queryDropdownOccupant.isLoading ||
    //     queryDropdownOccupant.isFetching ||
    //     queryDropdownHouse.isLoading ||
    //     queryDropdownHouse.isFetching;

    return (
        <MainLayout
            title="Tambah Penghuni Rumah"
            breadcrumbs={BREADCRUBMS.HOUSE_OCCUPANT.CREATE()}
        >
            <Card>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="occupantId"
                        label="Penghuni"
                        rules={[yupSync]}
                    >
                        <Select
                            loading={
                                queryDropdownOccupant.isLoading ||
                                queryDropdownOccupant.isFetching
                            }
                            options={selectOptionsOccupant}
                            filterOption={false}
                            placeholder="Pilih penghuni"
                            allowClear
                            showSearch
                            onSearch={(value) => setSearchValueOccupant(value)}
                        />
                    </Form.Item>
                    <Form.Item name="houseId" label="Rumah" rules={[yupSync]}>
                        <Select
                            allowClear
                            loading={
                                queryDropdownHouse.isLoading ||
                                queryDropdownHouse.isFetching
                            }
                            placeholder="Pilih rumah yang tersedia"
                            showSearch
                            options={selectOptionsHouse}
                            filterOption={false}
                            onSearch={(value) => setSearchValueHouse(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="occupantStatus"
                        label="Status Menghuni"
                        rules={[yupSync]}
                    >
                        <Select
                            placeholder="Pilih status menghuni"
                            options={occupantStatusOptions}
                        />
                    </Form.Item>
                    <ButtonAction
                        actions={[
                            <Button href={ROUTES.HOUSE_OCCUPANT_INDEX}>
                                Batal
                            </Button>,
                            <Button type="primary" htmlType="submit">
                                Simpan
                            </Button>,
                        ]}
                    />
                </Form>
            </Card>
        </MainLayout>
    );
}
