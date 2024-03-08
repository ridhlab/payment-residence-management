import { OccupantStatus } from "@/enums/occupant-status";

export const occupantStatusTranslation = (status: OccupantStatus) => {
    if (status === OccupantStatus.CONTRACT) return "Kontrak";
    if (status === OccupantStatus.PERMANENT) return "Tetap";
};
