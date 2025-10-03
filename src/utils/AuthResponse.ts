export interface AuthResponse{
    userId: number;
    username: string;
    token: string;
    roles: string[];
}