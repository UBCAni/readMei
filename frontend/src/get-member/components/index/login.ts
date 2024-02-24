import { verifyCredentials } from "./api";
import { useNavigate } from "react-router-dom";

export interface LoginState {
    authenticated: boolean;
    message: string;
}

export async function authenticateUser(email: string, pw: string): Promise<LoginState> {
    // add constraint validation before making request as needed
    //
    //
    //
    try {
        let result: boolean = await verifyCredentials(email, pw);

        if (result) {
            return {
                authenticated : true,
                message : "Login Successful"
            };
        } else {
            return {
                authenticated : false,
                message : "Login Failed. User not authorized."
            };
        }
    } catch (error) {
        return {
            authenticated : false,
            message : "Login Failed. This error was encountered: " + error
        };
    }
}