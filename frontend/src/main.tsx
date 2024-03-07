import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import LoaderFullscreen from "./components/shared/loader/loader-fullscreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { colorConfig } from "./themes/color";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./main.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Suspense fallback={<LoaderFullscreen />}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: colorConfig.primary.main,
                        },
                    }}
                >
                    <RouterProvider router={router} />
                </ConfigProvider>
            </QueryClientProvider>
        </Suspense>
    </React.StrictMode>
);
