export interface User {
    id: number;
    email: string;
    token: string;
    full_name: string;
    avatar: string | null;
    role: string;
    subdivision?: {
        name: string
    }
}


export interface UserSchema {
    authData?: User
}
