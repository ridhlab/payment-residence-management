import { IHouse } from "@/interfaces/entities/houses";
import { IBaseResponse } from "../base";

export interface IHouseIndexData {
    id: number;
    code: string;
    isOccupied: boolean;
    occupant: string;
}

export interface IHouseIndexResponse extends IBaseResponse<IHouseIndexData[]> {}
export interface IHouseDefaultValueForFormResponse
    extends IBaseResponse<Pick<IHouse, "code" | "id">> {}
