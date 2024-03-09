/* eslint-disable react-refresh/only-export-components */
import LoaderFullscreen from "@/components/shared/loader/loader-fullscreen";
import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./list-route";

const Dashboard = React.lazy(() => import("@/pages/dashboard"));

const HouseIndexPage = React.lazy(() => import("@/pages/houses"));
const HouseFormPage = React.lazy(() => import("@/pages/houses/form"));
const OccupantIndexPage = React.lazy(() => import("@/pages/occupants"));
const OccupantFormPage = React.lazy(() => import("@/pages/occupants/form"));
const MonthlyFeeIndexPage = React.lazy(() => import("@/pages/monthly-fees"));
const MonthlyFeeFormPage = React.lazy(
    () => import("@/pages/monthly-fees/form")
);
const MonthlyExpenseIndexPage = React.lazy(
    () => import("@/pages/monthly-expenses")
);
const MonthlyExpenseFormPage = React.lazy(
    () => import("@/pages/monthly-expenses/form")
);
const HouseOccupantIndexPage = React.lazy(
    () => import("@/pages/house-occupants")
);
const HouseOccupantFormPage = React.lazy(
    () => import("@/pages/house-occupants/form")
);
const HouseOccupantDetailPage = React.lazy(
    () => import("@/pages/house-occupants/detail")
);
const ReportPaymentPage = React.lazy(
    () => import("@/pages/report-payments/index")
);
const OutcomeIndexPage = React.lazy(() => import("@/pages/outcomes"));
const OutcomeFormPage = React.lazy(() => import("@/pages/outcomes/form"));

export const withSuspense = (component: React.ReactNode) => {
    return <Suspense fallback={<LoaderFullscreen />}>{component}</Suspense>;
};

export const router = createBrowserRouter([
    {
        path: ROUTES.DASHBOARD,
        element: withSuspense(<Dashboard />),
    },
    {
        path: ROUTES.HOUSE_INDEX,
        element: withSuspense(<HouseIndexPage />),
    },
    {
        path: ROUTES.HOUSE_CREATE,
        element: withSuspense(<HouseFormPage />),
    },
    {
        path: ROUTES.HOUSE_EDIT,
        element: withSuspense(<HouseFormPage editPage />),
    },
    {
        path: ROUTES.OCCUPANT_INDEX,
        element: withSuspense(<OccupantIndexPage />),
    },
    {
        path: ROUTES.OCCUPANT_CREATE,
        element: withSuspense(<OccupantFormPage />),
    },
    {
        path: ROUTES.OCCUPANT_EDIT,
        element: withSuspense(<OccupantFormPage editPage />),
    },
    {
        path: ROUTES.MONTHLY_FEE_INDEX,
        element: withSuspense(<MonthlyFeeIndexPage />),
    },
    {
        path: ROUTES.MONTHLY_FEE_CREATE,
        element: withSuspense(<MonthlyFeeFormPage />),
    },
    {
        path: ROUTES.MONTHLY_FEE_EDIT,
        element: withSuspense(<MonthlyFeeFormPage editPage />),
    },
    {
        path: ROUTES.MONTHLY_EXPENSE_INDEX,
        element: withSuspense(<MonthlyExpenseIndexPage />),
    },
    {
        path: ROUTES.MONTHLY_EXPENSE_CREATE,
        element: withSuspense(<MonthlyExpenseFormPage />),
    },
    {
        path: ROUTES.MONTHLY_EXPENSE_EDIT,
        element: withSuspense(<MonthlyExpenseFormPage editPage />),
    },
    {
        path: ROUTES.HOUSE_OCCUPANT_INDEX,
        element: withSuspense(<HouseOccupantIndexPage />),
    },
    {
        path: ROUTES.HOUSE_OCCUPANT_CREATE,
        element: withSuspense(<HouseOccupantFormPage />),
    },
    {
        path: ROUTES.HOUSE_OCCUPANT_DETAIL,
        element: withSuspense(<HouseOccupantDetailPage />),
    },
    {
        path: ROUTES.REPORT_PAYMENT,
        element: withSuspense(<ReportPaymentPage />),
    },
    {
        path: ROUTES.OUTCOMES_INDEX,
        element: withSuspense(<OutcomeIndexPage />),
    },
    {
        path: ROUTES.OUTCOME_CREATE,
        element: withSuspense(<OutcomeFormPage />),
    },
]);
