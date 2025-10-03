import {BaseAPI} from "./BaseAPI.ts";
import type {Marca} from "../utils/Marca.ts";

export class MarcaApiService extends BaseAPI{
    endpoint: string = "marca";
    fullUrl: string = `${this.baseUrl}/${this.endpoint}`;

    async getAllMarcas(): Promise<Marca[]> {
        const response = await fetch(this.baseUrl, {headers: this.getAuthHeaders()});
        return this.handleResponse<Marca[]>(response);
    }
}