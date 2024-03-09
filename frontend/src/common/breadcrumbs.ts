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
            { label: "Tambah Penghuni", href: ROUTES.OCCUPANT_CREATE },
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
    MONTHLY_FEE: {
        INDEX: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Daftar Iuran Bulanan", href: ROUTES.MONTHLY_FEE_INDEX },
        ],
        CREATE: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            {
                label: "Daftar Iuran Bulanan",
                href: ROUTES.MONTHLY_FEE_INDEX,
            },
            { label: "Tambah Iuran Bulanan", href: ROUTES.MONTHLY_FEE_CREATE },
        ],
        EDIT: (id) => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            {
                label: "Daftar Iuran Bulanan",
                href: ROUTES.MONTHLY_FEE_INDEX,
            },
            {
                label: "Edit Iuran Bulanan",
                href: parsingRoute(ROUTES.MONTHLY_FEE_EDIT, { id }),
            },
        ],
    },
    MONTHLY_EXPENSE: {
        INDEX: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            {
                label: "Daftar Pengeluaran Bulanan",
                href: ROUTES.MONTHLY_EXPENSE_INDEX,
            },
        ],
        CREATE: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            {
                label: "Daftar Pengeluaran Bulanan",
                href: ROUTES.MONTHLY_EXPENSE_INDEX,
            },
            {
                label: "Tambah Pengeluaran Bulanan",
                href: ROUTES.MONTHLY_EXPENSE_CREATE,
            },
        ],
        EDIT: (id) => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            {
                label: "Daftar Pengeluaran Bulanan",
                href: ROUTES.MONTHLY_EXPENSE_INDEX,
            },
            {
                label: "Edit Pengeluaran Bulanan",
                href: parsingRoute(ROUTES.MONTHLY_EXPENSE_EDIT, { id }),
            },
        ],
    },
    HOUSE_OCCUPANT: {
        INDEX: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            {
                label: "Daftar Penghuni Rumah Aktif",
                href: ROUTES.HOUSE_OCCUPANT_INDEX,
            },
        ],
        CREATE: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            {
                label: "Daftar Penghuni Rumah Aktif",
                href: ROUTES.HOUSE_OCCUPANT_INDEX,
            },
            {
                label: "Tambah Penghuni Rumah",
                href: ROUTES.HOUSE_OCCUPANT_CREATE,
            },
        ],
        DETAIL: (id) => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            {
                label: "Daftar Penghuni Rumah Aktif",
                href: ROUTES.HOUSE_OCCUPANT_INDEX,
            },
            {
                label: "Detail Penghuni Rumah",
                href: parsingRoute(ROUTES.HOUSE_OCCUPANT_DETAIL, { id }),
            },
        ],
    },
    REPORT_PAYMENT: () => [
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Laporan Pembayaran", href: ROUTES.REPORT_PAYMENT },
    ],
    OUTCOMES: {
        INDEX: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Pengeluaran", href: ROUTES.OUTCOMES_INDEX },
        ],
        CREATE: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Pengeluaran", href: ROUTES.OUTCOMES_INDEX },
            { label: "Tambah Pengeluaran", href: ROUTES.OUTCOME_CREATE },
        ],
    },
};
