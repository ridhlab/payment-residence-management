import { parsingRoute } from "@/helpers/route";
import { ROUTES } from "@/routes/list-route";

export const BREADCRUBMS = {
    DASHBOARD: () => [{ label: "Dashboard", href: ROUTES.DASHBOARD }],
    HOUSE: {
        INDEX: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Daftar Rumah", href: ROUTES.HOUSE_INDEX },
        ],
        CREATE: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Daftar Rumah", href: ROUTES.HOUSE_INDEX },
            { label: "Tambah Rumah", href: ROUTES.HOUSE_CREATE },
        ],
        EDIT: (id) => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Daftar Rumah", href: ROUTES.HOUSE_INDEX },
            {
                label: "Edit Rumah",
                href: parsingRoute(ROUTES.HOUSE_EDIT, { id }),
            },
        ],
    },
    OCCUPANT: {
        INDEX: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Daftar Penghuni", href: ROUTES.OCCUPANT_INDEX },
        ],
        CREATE: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Daftar Penghuni", href: ROUTES.OCCUPANT_INDEX },
            { label: "Create Penghuni", href: ROUTES.OCCUPANT_CREATE },
        ],
        EDIT: (id) => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Daftar Penghuni", href: ROUTES.OCCUPANT_INDEX },
            {
                label: "Edit Penghuni",
                href: parsingRoute(ROUTES.OCCUPANT_EDIT, { id }),
            },
        ],
    },
};
