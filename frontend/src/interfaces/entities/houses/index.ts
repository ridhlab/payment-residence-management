import { IBaseEntity } from "../base";

export interface IHouse extends IBaseEntity {
    is_occupied: boolean;
    code: string;
}
