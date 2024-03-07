import { IOccupant } from "@/interfaces/entities/occupants";
import { IBaseResponse } from "../base";

export interface IOccupantIndexResponse extends IBaseResponse<IOccupant[]> {}
export interface IOccupantDefaultValueForFormResponse
    extends IBaseResponse<
        Pick<IOccupant, "fullname" | "phone" | "isMarried">
    > {}
