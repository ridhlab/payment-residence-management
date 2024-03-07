import { IBaseEntity } from "../base";

export interface IHistoricalHouseOccupant extends IBaseEntity {
    startDate: string;
    endDate: string;
    houseOccupantId: number;
}
