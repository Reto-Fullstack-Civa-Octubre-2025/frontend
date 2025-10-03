import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {BusesPage} from "../pages/private/BusesPage.tsx";
import {AuthPage} from "../pages/public/AuthPage.tsx";
import {PrivateRoute} from "./PrivateRoute.tsx";
import {PublicRoute} from "./PublicRoute.tsx";

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<PublicRoute><AuthPage/></PublicRoute>}/>
                <Route path="/buses" element={<PrivateRoute><BusesPage/></PrivateRoute>}></Route>
                <Route path="*" element={<Navigate to="/buses" replace={true}/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}