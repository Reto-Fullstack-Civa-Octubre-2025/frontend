import type {AuthResponse} from "../utils/AuthResponse.ts";

export class BaseAPI {
    baseUrl: string = "http://localhost:8080";

    protected async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return await response.json() as Promise<T>;
    }

    protected getAuthHeaders(): Headers {
        const headers = new Headers();
        const authResponse:AuthResponse | null = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user") as string) : null;
        const token = authResponse?.token;

        headers.append("Content-Type", "application/json");
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
        return headers;
    }

}