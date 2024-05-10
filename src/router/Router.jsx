import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { Login } from "../pages/Login";
import { Game } from "../pages/Game";

export function Router() {

    return (
        <ScrollToTop>
            <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />

                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Login />} />
                {/* </Route>

                <Route element={<PrivateRoute />}> */}
                    <Route path="/game" element={<Game />} />
                </Route>
            </Routes>
        </ScrollToTop>
    )
}