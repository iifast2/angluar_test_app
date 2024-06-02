export interface Login {
    email:string;
    password: string;
}

export interface LoginResponse {
    token: string;
    userId: number;
    email: string;
    firstname: string;
    lastname: string;
}