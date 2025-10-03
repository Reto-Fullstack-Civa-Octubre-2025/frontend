import {BaseAPI} from "./BaseAPI.ts";
import type {PageResponse} from "../utils/PageResponse.ts";
import type {BusResponse} from "../utils/BusResponse.ts";
import type {BusRequest} from "../utils/BusRequest.ts";
import type {PageRequest} from "../utils/PageRequest.ts";

export class BusApiService extends BaseAPI {
    endpoint = "bus";

    async getAllBuses(pageRequest:PageRequest): Promise<PageResponse<BusResponse>> {
        const searchParams = new URLSearchParams({
            page: pageRequest.page.toString(),
            size: pageRequest.size.toString(),
            sortBy: pageRequest.sortBy,
            direction: pageRequest.direction
        });
        const fullUrl = `${this.baseUrl}/${this.endpoint}?${searchParams.toString()}`;
        const response = await fetch(fullUrl, {headers: this.getAuthHeaders()});

        return this.handleResponse<PageResponse<BusResponse>>(response);
    }

    async getById(busId: number): Promise<BusResponse> {
        const fullUrl = `${this.baseUrl}/${this.endpoint}/${busId}`;
        const response = await fetch(fullUrl, {headers: this.getAuthHeaders()});
        return this.handleResponse<BusResponse>(response);
    }

    async createBus(bus: BusRequest): Promise<BusResponse> {
        const fullUrl = `${this.baseUrl}/${this.endpoint}`;
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: this.getAuthHeaders(),
            body: JSON.stringify(bus),
        });
        return this.handleResponse<BusResponse>(response);
    }

    async deleteBus(busId: number): Promise<void> {
        const fullUrl = `${this.baseUrl}/${this.endpoint}/${busId}`;
        const response = await fetch(fullUrl, { method: "DELETE", headers: this.getAuthHeaders() });
        if (!response.ok) {
            throw new Error(`Error eliminando bus ${busId}`);
        }
    }
}
