import Button from "@/components/shared/button/button";
import { getCurrencyId } from "@/helpers/currency";
import { DeleteOutlined } from "@ant-design/icons";
import { Flex, InputNumber, Tag } from "antd";
import { PresetColorType, PresetStatusColorType } from "antd/es/_util/colors";
import { LiteralUnion } from "antd/es/_util/type";

export default function TagItemPayment({
    color = undefined,
    name,
    type,
    fee,
    handleDelete,
    handleChange,
}: {
    handleChange: (val) => void;
    color?: LiteralUnion<PresetColorType | PresetStatusColorType>;
    name: string;
    type: "fee" | "expense";
    fee: number;
    handleDelete?: () => void;
}) {
    return (
        <Tag color={color} style={{ width: "100%" }}>
            <Flex justify="space-between">
                <div>
                    <p>Nama : {name}</p>
                    <p>Biaya : {getCurrencyId(fee)}</p>
                    <p>
                        Tipe :{" "}
                        {type === "fee"
                            ? "Iuran Bulanan"
                            : "Pengeluaran Bulanan"}
                    </p>
                    <span>Bayar berapa bulan :</span>
                    <InputNumber
                        size="small"
                        defaultValue={1}
                        onChange={(val) => handleChange(val)}
                    />
                </div>
                <Button
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                ></Button>
            </Flex>
        </Tag>
    );
}
