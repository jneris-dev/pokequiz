import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { PrivateRoutes } from "./PrivateRoutes";

import { Login } from "../pages/Login";
import { Game } from "../pages/Game";

export function Router() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route path="*" element={<Navigate replace to="/" />} />

            <Route path="/" element={<Login />} />

            <Route element={<PrivateRoutes />}>
                <Route path="/game" element={<Game />} />
            </Route>
        </Routes>
    )
}