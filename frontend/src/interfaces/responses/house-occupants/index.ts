import { IHouseOccupant } from "@/interfaces/entities/house-occupants";
import { IBaseResponse } from "../base";
import { OccupantStatus } from "@/enums/occupant-status";
import { IHouse } from "@/interfaces/entities/houses";
import { IOccupant } from "@/interfaces/entities/occupants";
import { IHouseOccupantContract } from "@/interfaces/entities/house-occupant-contracts";

export interface IHouseOccupantOcccupiedData {
    id: number;
    houseCode: string;
    occupantName: string;
    occupantStatus: OccupantStatus;
}

export interface IHouseOccupantOccupiedResponse
    extends IBaseResponse<IHouseOccupantOcccupiedData[]> {}

export interface IHouseOccupantDetailData extends IHouseOccupant {
    house: IHouse;
    occupant: IOccupant;
    contractDetail: IHouseOccupantContract;
}

export interface IHouseOccupantDetailResponse
    extends IBaseResponse<IHouseOccupantDetailData> {}
