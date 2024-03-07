/* eslint-disable react-refresh/only-export-components */
import LoaderFullscreen from "@/components/shared/loader/loader-fullscreen";
import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./list-route";

const Dashboard = React.lazy(() => import("@/pages/dashboard"));

const HouseIndex = React.lazy(() => import("@/pages/houses"));

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
        element: withSuspense(<HouseIndex />),
    },
]);
