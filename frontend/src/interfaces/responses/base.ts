import { ISelectOptions } from "@/common/select-options";

export interface IBaseResponse<T> {
    status: string;
    message: string;
    data: T;
}

export interface IDropdownResponse extends IBaseResponse<ISelectOptions[]> {}
