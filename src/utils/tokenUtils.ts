export const tokenStore = {
    accessTokenKey: "access_token",

    getAccessToken(): string {
        return localStorage.getItem(this.accessTokenKey) || "";
    },

    setAccessToken(accessToken: string): void {
        localStorage.setItem(this.accessTokenKey, accessToken);
    },

    removeAccessToken(): void {
        localStorage.removeItem(this.accessTokenKey);
    },

    tokenExist(): boolean {
        return !!this.getAccessToken();
    }
};
