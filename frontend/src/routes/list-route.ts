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

    HOUSE_OCCUPANT_INDEX: "/house-occupant",
    HOUSE_OCCUPANT_CREATE: "/house-occupant/create",
    HOUSE_OCCUPANT_DETAIL: "/house-occupant/:id",

    REPORT_PAYMENT: "/report-payment",
    OUTCOMES_INDEX: "/outcome",
    OUTCOME_CREATE: "/outcome/create",
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
        UPLOAD_IDENTITY_CARD: "/occupant/upload-identity-card/:id",
        DROPDOWN: {
            NOT_OCCUPY: "/occupant/get-dropdown/not-occupy",
        },
    },
    MONTHLY_FEES: {
        INDEX: "/monthly-fee",
        GET_ALL: "/monthly-fee/get-all",
        DEFAULT_VALUE_FOR_FORM: "/monthly-fee/:id/default-value-for-form",
        STORE: "/monthly-fee/store",
        UPDATE: "/monthly-fee/:id/update",
        DROPDOWN: {
            NOT_OCCUPIED: "/monthly-fee/get-dropdown/not-occupied",
        },
    },
    HOUSE_OCCUPANTS: {
        GET_HOUSE_OCCUPIED: "/house-occupant/occupied",
        DETAIL: "/house-occupant/:id",
        ADD_OCCUPANT: "/house-occupant/add-occupant",
        REMOVE_HOUSE_OCCUPANT: "/house-occupant/remove-house-occupant/:id",
    },
    HISTORICAL_HOUSE_OCCUPANTS: {
        BY_HOUSE: "/historical-house-occupant/by-house/:houseId",
    },
    PAYMENTS: {
        ADD_PAYMENTS: "/payment/add-payments",
        BY_HOUSE_OCCUPANT_ID: "/payment/by-house-occupant/:houseOccupantId",
        GET_PAID_BY_HOUSE_OCCUPANT:
            "/payment/paid-by-house-occupant/:houseOccupantId",
        GET_NOT_PAID_BY_HOUSE_OCCUPANT:
            "/payment/not-paid-by-house-occupant/:houseOccupantId",
    },

    TOTAL_INCOME: "/total-income",
    OUTCOMES: {
        ADD_OUTCOME: "/outcome/add-outcome",
        INDEX: "/outcome",
    },
    REPORT_PAYMENTS: {
        INCOMES: "/report-payment/incomes",
        OUTCOMES: "/report-payment/outcomes",
        BALANCE: "/report-payment/balance",
        FOR_YEAR: "/report-payment/for-year/:year",
    },
};
