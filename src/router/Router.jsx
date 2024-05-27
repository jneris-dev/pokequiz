import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

import { Login } from "../pages/Login";
import { Game } from "../pages/Game";
import { Profile } from "../pages/Profile";

export function Router() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Routes>
            <Route path="*" element={<Navigate replace to="/" />} />

            <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Game />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}