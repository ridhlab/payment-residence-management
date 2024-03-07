import { IHouse } from "@/interfaces/entities/houses";
import { IBaseResponse } from "../base";

export interface IHouseIndexResponse extends IBaseResponse<IHouse[]> {}
export interface IHouseDefaultValueForFormResponse
    extends IBaseResponse<Pick<IHouse, "code" | "id">> {}
