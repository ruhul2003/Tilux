"use client";

import React from "react";
import logo from "../../assets/logo-white.svg";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";   // ← Added this

const NavBar = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();   // ← Added this

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "All Tiles", path: "/all-tiles" },
        { name: "My Profile", path: "/profile" },
    ];

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            router.push("/");        // Redirect to home page after logout
            router.refresh();        // Optional: Refresh to update session state
        } catch (error) {
            console.error("Logout failed:", error);
            // Fallback redirect
            window.location.href = "/";
        }
    };

    // Get profile image with fallback
    const getProfileImageUrl = (user) => {
        if (!user) return null;
        return user.image || 
               `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=FFD700&color=000000&size=128`;
    };

    const profileImageUrl = getProfileImageUrl(session?.user);

    return (
        <header className="w-full bg-gradient-to-r from-zinc-800 to-gray-700 pt-3 px-4 lg:px-8 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
                
                {/* Left Side */}
                <div className="flex items-center gap-3">
                    {/* Mobile Menu */}
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul className="menu dropdown-content mt-4 w-64 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-2xl p-4 shadow-2xl space-y-2 z-50">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link href={link.path} className="text-white rounded-xl px-4 py-3 hover:bg-white/10 transition block">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link href="/">
                        <Image src={logo} alt="Tilux Logo" width={100} height={40} priority className="object-contain" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className="relative text-white text-[16px] font-medium tracking-wide transition hover:text-[#FFD700] group"
                        >
                            {link.name}
                            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* Right Side - User Profile */}
                <div className="flex items-center gap-3">
                    {!isPending && (
                        <>
                            {session?.user ? (
                                <div className="flex items-center gap-4">
                                    <div className="dropdown dropdown-end">
                                        <div
                                            tabIndex={0}
                                            role="button"
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20">
                                                {profileImageUrl && (
                                                    <img
                                                        src={profileImageUrl}
                                                        alt={session.user.name || "User"}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 
                                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || "User")}&background=FFD700&color=000000&size=128`;
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            <div className="hidden md:block">
                                                <p className="text-sm font-medium text-white">{session.user.name}</p>
                                                <p className="text-xs text-gray-400">{session.user.email}</p>
                                            </div>
                                        </div>

                                        {/* Dropdown Menu */}
                                        <ul className="dropdown-content mt-3 w-64 rounded-2xl border border-white/20 bg-zinc-900/95 backdrop-blur-2xl p-4 shadow-2xl z-50">
                                            <li>
                                                <Link href="/profile" className="block px-4 py-3 hover:bg-white/10 rounded-xl text-white transition">
                                                    View Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-3 hover:bg-red-500/10 hover:text-red-400 rounded-xl text-white transition"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-5 py-2 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-5 py-2 rounded-full bg-[#FFD700] text-black font-bold hover:scale-105 transition"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default NavBar;