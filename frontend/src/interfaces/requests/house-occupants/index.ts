import { OccupantStatus } from "@/enums/occupant-status";

export interface IAddHouseOccupantRequest {
    occupantId: number;
    houseId: number;
    occupantStatus: OccupantStatus;
}
