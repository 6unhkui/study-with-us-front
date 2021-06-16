import { ChangePasswordDTO, LoginDTO, RegisterDTO, TokenDTO, UpdateUserDTO, UserDTO } from "@/api/dto/account.dto";
import { fetcher } from "@/utils/axiosUtils";

export class AccountAPI {
    public static me(): Promise<UserDTO> {
        return fetcher<UserDTO>({ url: "/api/v1/account" });
    }

    public static login(request: LoginDTO): Promise<TokenDTO> {
        return fetcher<TokenDTO>({ method: "POST", url: "/api/v1/auth/getToken", data: request });
    }

    public static register(request: RegisterDTO): Promise<boolean> {
        return fetcher<boolean>({ method: "POST", url: "/api/v1/auth/register", data: request });
    }

    public static checkDuplicatedEmail(email: string): Promise<boolean> {
        return fetcher<boolean>({ url: "/api/v1/auth/check-email", params: { email } });
    }

    public static updateUserInfo(request: UpdateUserDTO): Promise<boolean> {
        return fetcher<boolean>({ method: "PUT", url: "/api/v1/account", data: request });
    }

    public static changeProfileImage(request: FormData): Promise<string> {
        return fetcher<string>({ method: "POST", url: "/api/v1/account/profile", data: request });
    }

    public static changePassword(request: ChangePasswordDTO): Promise<boolean> {
        return fetcher<boolean>({ method: "PUT", url: "/api/v1/account/password", data: request });
    }

    public static withdraw(): Promise<boolean> {
        return fetcher<boolean>({ method: "DELETE", url: "/api/v1/account" });
    }
}
