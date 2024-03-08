import { OccupantStatus } from "@/enums/occupant-status";
import { occupantStatusTranslation } from "./translation";

export interface ISelectOptions {
    label: string;
    value: string | number;
}

export const occupantStatusOptions = [
    {
        label: occupantStatusTranslation(OccupantStatus.CONTRACT),
        value: OccupantStatus.CONTRACT,
    },
    {
        label: occupantStatusTranslation(OccupantStatus.PERMANENT),
        value: OccupantStatus.PERMANENT,
    },
];
