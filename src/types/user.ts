export interface User {
    id_user: number;
    name: String;
    email: String;
    password: string;
}

export interface UserPayload {
    id_user: number;
    name: String;
}