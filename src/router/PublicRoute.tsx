import type {AuthResponse} from "../utils/AuthResponse.ts";
import {Navigate} from "react-router-dom";
import type {JSX} from "react";

interface PrivateRouteProps {
    children: JSX.Element;
}
export function PublicRoute({ children }: PrivateRouteProps) {
    const authResponse:AuthResponse | null = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string) : null;
    const token = authResponse?.token;

    return (!token)? children: <Navigate to="/buses" replace={true}></Navigate>
}