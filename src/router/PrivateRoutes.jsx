import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/appContext";

export function PrivateRoutes() {
    const { signed } = useAppContext()

    return signed ? <Outlet /> : <Navigate to="/" />;
}