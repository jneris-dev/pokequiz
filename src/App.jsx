import { BrowserRouter } from "react-router-dom";

import { AppContextProvider } from "./context/appContext";
import { Router } from "./router/Router"

export function App() {
    return (
        <AppContextProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </AppContextProvider>
    )
}