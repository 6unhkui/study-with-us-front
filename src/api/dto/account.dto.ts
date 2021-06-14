export type AuthProvider = "LOCAL" | "GOOGLE" | "NAVER";

export interface UserDTO {
    accountId: number;
    name: string;
    profileImg: string;
    email: string;
    role: string;
    provider: AuthProvider;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface TokenDTO {
    accessToken: string;
    expiredAt: number;
    now: number;
}

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserDTO {
    name: string;
}

export interface ChangeProfileDTO {
    file: FormData;
}

export interface ChangePasswordDTO {
    oldPassword: string;
    newPassword: string;
}
