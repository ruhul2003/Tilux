import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    // Optional but helpful:
    fetchOptions: {
        onError(e) {
            console.error("Auth Client Error:", e);
        }
    }
});

export const { 
    signIn, 
    signUp, 
    useSession,
    signOut 
} = authClient;