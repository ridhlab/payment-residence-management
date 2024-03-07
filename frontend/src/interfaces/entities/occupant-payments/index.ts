import { IBaseEntity } from "../base";

export interface IOccupantPayment extends IBaseEntity {
    houseOccupantId: number;
    paymentDate: string;
}
