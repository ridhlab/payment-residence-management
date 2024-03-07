import { IBaseResponse } from "../base";
import { OccupantStatus } from "@/enums/occupant-status";

export interface IHouseOccupantOcccupiedData {
    id: number;
    houseCode: string;
    occupantName: string;
    occupantStatus: OccupantStatus;
}

export interface IHouseOccupantOccupiedResponse
    extends IBaseResponse<IHouseOccupantOcccupiedData[]> {}
