import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoutes() {
    const sessionToken = sessionStorage.getItem("@AuthFirebase:token") || null

    return sessionToken ? <Outlet /> : <Navigate to="/login" />;
}