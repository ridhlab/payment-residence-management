import { ButtonProps } from "antd";
import Button from "./button";
import { PlusOutlined } from "@ant-design/icons";

interface IProps extends ButtonProps {}

export default function AddButton(props: IProps) {
    return (
        <Button icon={<PlusOutlined />} {...props}>
            {props.children ?? "Tambah"}
        </Button>
    );
}
