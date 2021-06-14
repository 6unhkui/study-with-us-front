import { ChangePasswordDTO, LoginDTO, RegisterDTO, TokenDTO, UpdateUserDTO, UserDTO } from "@/api/dto/account.dto";
import { fetcher } from "@/utils/axiosUtils";

export class AccountAPI {
    public static async me(): Promise<UserDTO> {
        return fetcher<UserDTO>({ url: "/api/v1/account" });
    }

    public static async login(request: LoginDTO): Promise<TokenDTO> {
        return fetcher<TokenDTO>({ method: "POST", url: "/api/v1/auth/getToken", data: request });
    }

    public static async register(request: RegisterDTO): Promise<boolean> {
        return fetcher<boolean>({ method: "POST", url: "/api/v1/auth/register", data: request });
    }

    public static async checkDuplicatedEmail(email: string): Promise<boolean> {
        return fetcher<boolean>({ url: "/api/v1/auth/check-email", params: { email } });
    }

    public static async updateUserInfo(request: UpdateUserDTO): Promise<boolean> {
        return fetcher<boolean>({ method: "PUT", url: "/api/v1/account", data: request });
    }

    public static async changeProfileImage(request: FormData): Promise<string> {
        return fetcher<string>({ method: "POST", url: "/api/v1/account/profile", data: request });
    }

    public static async changePassword(request: ChangePasswordDTO): Promise<boolean> {
        return fetcher<boolean>({ method: "PUT", url: "/api/v1/account/password", data: request });
    }

    public static async withdraw(): Promise<boolean> {
        return fetcher<boolean>({ method: "DELETE", url: "/api/v1/account" });
    }
}
