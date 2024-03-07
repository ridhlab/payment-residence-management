import { OccupantStatus } from "@/enums/occupant-status";
import { IBaseEntity } from "../base";

export interface IHouseOccupant extends IBaseEntity {
    occupantStatus: OccupantStatus;
    isStillOccupant: boolean;
    houseId: number;
    occupantId: number;
}
