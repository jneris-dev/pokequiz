import { Navigate, Outlet } from "react-router-dom";

import { useAppContext } from "../context/appContext";

export function PrivateRoute() {
    const { tokenLoggedUser } = useAppContext();

    if (!tokenLoggedUser)
        return <Navigate to="/" replace />;

    return <Outlet />;
}