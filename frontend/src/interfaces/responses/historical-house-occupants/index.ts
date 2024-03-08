import { IBaseResponse } from "../base";

export interface IHistoricalHouseOccupantByHouseData {
    id: number;
    houseCode: string;
    occupantName: string;
    isStillOccupant: string;
    startDate: string;
    endDate: string;
}
export interface IHistoricalHouseOccupantByHouseResponse
    extends IBaseResponse<IHistoricalHouseOccupantByHouseData[]> {}
