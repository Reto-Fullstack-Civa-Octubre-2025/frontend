import {BaseAPI} from "./BaseAPI.ts";
import type {AuthResponse} from "../utils/AuthResponse.ts";
import type {SignInRequest} from "../utils/SignInRequest.ts";
import type {SignUpRequest} from "../utils/SignUpRequest.ts";

export class AuthApiService extends BaseAPI{
    endpoint: string = "auth";
    fullUrl: string = `${this.baseUrl}/${this.endpoint}`;

    async signIn(signInRequest:SignInRequest): Promise<AuthResponse> {
        const response = await fetch(`${this.fullUrl}/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signInRequest),
        });
        return this.handleResponse<AuthResponse>(response);
    }

    async signUp(signInRequest:SignUpRequest): Promise<AuthResponse> {
        const response = await fetch(`${this.fullUrl}/sign-up`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signInRequest),
        });
        return this.handleResponse<AuthResponse>(response);
    }
}