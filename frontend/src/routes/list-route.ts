export const ROUTES = {
    DASHBOARD: "/",

    HOUSE_INDEX: "/house",
    HOUSE_CREATE: "/house/create",
    HOUSE_EDIT: "/house/:id/edit",

    OCCUPANT_INDEX: "/occupant",
    OCCUPANT_CREATE: "/occupant/create",
    OCCUPANT_EDIT: "/occupant/:id/edit",

    MONTHLY_FEE_INDEX: "/monthly-fee",
    MONTHLY_FEE_CREATE: "/monthly-fee/create",
    MONTHLY_FEE_EDIT: "/monthly-fee/:id/edit",

    MONTHLY_EXPENSE_INDEX: "/monthly-expense",
    MONTHLY_EXPENSE_CREATE: "/monthly-expense/create",
    MONTHLY_EXPENSE_EDIT: "/monthly-expense/:id/edit",
};

export const ENDPOINT_API = {
    HOUSES: {
        INDEX: "/house",
        DEFAULT_VALUE_FOR_FORM: "/house/:id/default-value-for-form",
        STORE: "/house/store",
        UPDATE: "/house/:id/update",
        DROPDOWN: {
            NOT_OCCUPIED: "/house/get-dropdown/not-occupied",
        },
    },
    OCCUPANTS: {
        INDEX: "/occupant",
        DEFAULT_VALUE_FOR_FORM: "/occupant/:id/default-value-for-form",
        STORE: "/occupant/store",
        UPDATE: "/occupant/:id/update",
        DROPDOWN: {
            NOT_OCCUPY: "/occupant/get-dropdown/not-occupy",
        },
    },
    MONTHLY_FEE: {
        INDEX: "/monthly-fee",
        DEFAULT_VALUE_FOR_FORM: "/monthly-fee/:id/default-value-for-form",
        STORE: "/monthly-fee/store",
        UPDATE: "/monthly-fee/:id/update",
        DROPDOWN: {
            NOT_OCCUPIED: "/monthly-fee/get-dropdown/not-occupied",
        },
    },
};
