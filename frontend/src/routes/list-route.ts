export const ROUTES = {
    DASHBOARD: "/",

    HOUSE_INDEX: "/house",
    HOUSE_CREATE: "/house/create",
    HOUSE_EDIT: "/house/:id/edit",

    OCCUPANT_INDEX: "/occupant",
    OCCUPANT_CREATE: "/occupant/create",
    OCCUPANT_EDIT: "/occupant/:id/edit",
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
        STORE: "/occupant/store",
        UPDATE: "/occupant/:id/update",
        DROPDOWN: {
            NOT_OCCUPY: "/occupant/get-dropdown/not-occupy",
        },
    },
};
