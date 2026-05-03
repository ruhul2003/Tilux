import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

// Export commonly used hooks and functions
export const {
    useSession,
    signIn,
    signUp,
    signOut,
    updateUser,
} = authClient;