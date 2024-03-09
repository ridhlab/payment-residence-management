import { IBaseEntity } from "../base";

export interface IHouseOccupantContract extends IBaseEntity {
    startDate: string;
    endDate: string;
    houseOccupantId: number;
}
