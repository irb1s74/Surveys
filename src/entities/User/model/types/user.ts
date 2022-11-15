export interface User {
    id: number;
    email: string;
    token: string
    full_name: string;
}


export interface UserSchema {
    authData?: User
}
