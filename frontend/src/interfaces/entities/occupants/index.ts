import { IBaseEntity } from "../base";

export interface IOccupant extends IBaseEntity {
    fullname: string;
    identityCardFilename: string;
    phone: string;
    isMarried: boolean;
    isOccupy: boolean;
}
