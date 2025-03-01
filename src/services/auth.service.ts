
import * as ApiService from "./api.service";

let currentTooken = "";

interface TokenResult { token: string }

export const setToken = (token: string) => currentTooken = token;
export const getToken = () => currentTooken;

export const authenticate = async (account: string = "", secret: string = ""): Promise<TokenResult> => {

    const body = {
        account: account.trim(),
        secret: btoa(secret)
        
    }

    console.log("autenticate", { body });

    const result = await ApiService.call<TokenResult>(ApiService.Endpoints.AUTH_TOKEN, "POST", "", "", body);

    return result;

}