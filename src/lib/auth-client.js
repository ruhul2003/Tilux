"use client";

import { useState, useEffect } from "react";

const getApiUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
        return "https://tilux-server-omega.vercel.app";
    }
    return "http://localhost:5000";
};

const API_URL = getApiUrl();

// Simple pub/sub pattern to trigger React state updates across hooks
const listeners = new Set();
let currentSession = null;
let currentPending = true;

const notifyListeners = () => {
    listeners.forEach(l => l({ data: currentSession, isPending: currentPending }));
};

export const fetchProfile = async () => {
    if (typeof window === "undefined") return;

    // 1. Try Express JWT token from localStorage
    const token = localStorage.getItem("tilux_token");
    if (token) {
        try {
            const res = await fetch(`${API_URL}/api/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.ok) {
                const userData = await res.json();
                currentSession = { user: userData };
                currentPending = false;
                notifyListeners();
                return;
            } else if (res.status === 401 || res.status === 403) {
                localStorage.removeItem("tilux_token");
            }
        } catch (err) {
            console.error("Error fetching Express session:", err);
        }
    }

    // 2. Try Better-Auth Google OAuth session cookie
    try {
        const res = await fetch(`/api/auth/get-session`, {
            credentials: "include"
        });
        if (res.ok) {
            const data = await res.json();
            if (data?.user) {
                currentSession = { user: data.user };
                currentPending = false;
                notifyListeners();
                return;
            }
        }
    } catch (err) {
        console.error("Error fetching Better-Auth session:", err);
    }

    currentSession = null;
    currentPending = false;
    notifyListeners();
};

// Start fetching session on startup if in browser
if (typeof window !== "undefined") {
    fetchProfile();
}

export const useSession = () => {
    const [state, setState] = useState({ data: currentSession, isPending: currentPending });

    useEffect(() => {
        listeners.add(setState);
        fetchProfile();
        return () => {
            listeners.delete(setState);
        };
    }, []);

    return state;
};

export const authClient = {
    signUp: {
        email: async ({ name, email, password, image, role }) => {
            try {
                currentPending = true;
                notifyListeners();
                const res = await fetch(`${API_URL}/api/auth/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, role, image })
                });
                const data = await res.json();
                if (!res.ok) {
                    currentPending = false;
                    notifyListeners();
                    return { error: new Error(data.message || "Failed to sign up") };
                }
                if (data.token) {
                    localStorage.setItem("tilux_token", data.token);
                    currentSession = { user: data.user };
                }
                currentPending = false;
                notifyListeners();
                return { data };
            } catch (err) {
                currentPending = false;
                notifyListeners();
                return { error: err };
            }
        }
    },
    signIn: {
        email: async ({ email, password }) => {
            try {
                currentPending = true;
                notifyListeners();
                const res = await fetch(`${API_URL}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (!res.ok) {
                    currentPending = false;
                    notifyListeners();
                    return { error: new Error(data.message || "Invalid credentials") };
                }
                localStorage.setItem("tilux_token", data.token);
                currentSession = { user: data.user };
                currentPending = false;
                notifyListeners();
                return { data };
            } catch (err) {
                currentPending = false;
                notifyListeners();
                return { error: err };
            }
        },
        social: async ({ provider = "google", callbackURL = "/" }) => {
            try {
                const res = await fetch(`/api/auth/sign-in/social`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ provider, callbackURL })
                });
                const data = await res.json();
                if (data.url) {
                    window.location.href = data.url;
                    return { data };
                } else if (data.redirect) {
                    window.location.href = data.redirect;
                    return { data };
                }
                window.location.href = `/api/auth/sign-in/social?provider=${provider}&callbackURL=${encodeURIComponent(callbackURL)}`;
            } catch (err) {
                window.location.href = `/api/auth/sign-in/social?provider=${provider}&callbackURL=${encodeURIComponent(callbackURL)}`;
            }
        }
    },
    signOut: async () => {
        localStorage.removeItem("tilux_token");
        try {
            await fetch(`/api/auth/sign-out`, {
                method: "POST",
                credentials: "include"
            });
        } catch (err) {
            // Ignore sign out fetch errors
        }
        currentSession = null;
        notifyListeners();
        return {};
    },
    updateUser: async ({ name, image }) => {
        try {
            const token = localStorage.getItem("tilux_token");
            const res = await fetch(`${API_URL}/api/auth/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name, image })
            });
            const data = await res.json();
            if (!res.ok) {
                return { error: new Error(data.message || "Update failed") };
            }
            await fetchProfile();
            return { data };
        } catch (err) {
            return { error: err };
        }
    }
};

export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const signOut = authClient.signOut;
export const updateUser = authClient.updateUser;
export const API_BASE_URL = API_URL;