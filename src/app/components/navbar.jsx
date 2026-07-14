"use client";

import React, { useState } from "react";
import logo from "../../assets/logo-white.svg";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "All Tiles", path: "/all-tiles" },
        { name: "My Profile", path: "/profile" },
    ];

    // ================= LOGOUT =================
    const handleLogout = async () => {
        try {
            await authClient.signOut();
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
            window.location.href = "/";
        }
    };

    // ================= PROTECTED NAVIGATION =================
    const handleProtectedNavigation = (path) => {
        if (session?.user) {
            router.push(path);
        } else {
            setShowLoginModal(true);
        }
    };

    const profileImageUrl = session?.user?.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "User")}&background=FFD700&color=000000&size=128`;

    return (
        <>
            <header className="w-full pb-5 bg-gradient-to-r from-zinc-800 to-gray-700 pt-3 px-2 lg:px-8 sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 lg:px-10 py-3 lg:py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">

                    {/* ================= LEFT SIDE: LOGO ================= */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src={logo}
                            alt="Tilux Logo"
                            width={85}
                            height={32}
                            priority
                            className="object-contain lg:w-[100px]"
                        />
                    </Link>

                    {/* ================= CENTER: DESKTOP NAVIGATION ================= */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <div key={link.path}>
                                {link.name === "All Tiles" ? (
                                    <button
                                        onClick={() => handleProtectedNavigation("/all-tiles")}
                                        className="relative text-white text-[16px] font-medium tracking-wide transition hover:text-[#FFD700] group cursor-pointer"
                                    >
                                        {link.name}
                                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                                    </button>
                                ) : (
                                    <Link
                                        href={link.path}
                                        className="relative text-white text-[16px] font-medium tracking-wide transition hover:text-[#FFD700] group"
                                    >
                                        {link.name}
                                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ================= RIGHT SIDE: AUTH + MOBILE MENU ================= */}
                    <div className="flex items-center gap-3">
                        {mounted && !isPending && (
                            <>
                                {session?.user ? (
                                    /* LOGGED IN: Profile Dropdown (Shows on all devices) */
                                    <div className="dropdown dropdown-end">
                                        <div
                                            tabIndex={0}
                                            role="button"
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20">
                                                <img
                                                    src={profileImageUrl}
                                                    alt={session.user.name || "User"}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="hidden md:block">
                                                <p className="text-sm font-medium text-white leading-none mb-1">{session.user.name}</p>
                                                <p className="text-[10px] text-gray-400 leading-none">{session.user.email}</p>
                                            </div>
                                        </div>
                                        <ul className="dropdown-content mt-4 w-60 rounded-2xl border border-white/20 bg-zinc-900/95 backdrop-blur-2xl p-2 shadow-2xl z-50">
                                            <li><Link href="/profile" className="block px-4 py-3 hover:bg-white/10 rounded-xl text-white transition">View Profile</Link></li>
                                            <li><button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-red-500/10 hover:text-red-400 rounded-xl text-white transition">Logout</button></li>
                                        </ul>
                                    </div>
                                ) : (
                                    /* LOGGED OUT: Desktop Auth Buttons (Hidden on mobile) */
                                    <div className="hidden lg:flex items-center gap-3">
                                        <Link
                                            href="/login"
                                            className="px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="px-6 py-2 rounded-full bg-[#FFD700] text-black text-sm font-bold hover:scale-105 transition"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}

                                {/* MOBILE HAMBURGER MENU (Always on the right) */}
                                <div className="dropdown dropdown-end lg:hidden">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition active:scale-95"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </div>

                                    <ul className="menu dropdown-content mt-4 w-64 rounded-2xl border border-white/20 bg-black/95 backdrop-blur-3xl p-4 shadow-2xl space-y-2 z-50">
                                        {/* Navigation Links */}
                                        {navLinks.map((link) => (
                                            <li key={link.path}>
                                                <Link
                                                    href={link.path}
                                                    className="text-white rounded-xl px-4 py-3 hover:bg-white/10 transition block"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}

                                        {/* MOBILE AUTH: Only shows inside menu when logged out */}
                                        {!session?.user && !isPending && (
                                            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                                                <Link
                                                    href="/login"
                                                    className="w-full text-center py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition"
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    href="/signup"
                                                    className="w-full text-center py-3 rounded-xl bg-[#FFD700] text-black font-bold hover:bg-yellow-400 transition"
                                                >
                                                    Sign Up
                                                </Link>
                                            </div>
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {/* ================= LOGIN MODAL ================= */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-zinc-900 rounded-3xl max-w-md w-full p-8 text-center border border-white/10 relative">
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                        >
                            ✕
                        </button>
                        <h2 className="text-3xl font-bold text-white mb-3">Login Required</h2>
                        <p className="text-gray-400 mb-8">You need to be logged in to browse our collection.</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => { setShowLoginModal(false); router.push("/login"); }}
                                className="bg-[#FFD700] text-black font-bold py-4 rounded-2xl hover:bg-yellow-400 transition"
                            >
                                Login Now
                            </button>
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="bg-white/10 text-white font-medium py-4 rounded-2xl hover:bg-white/20 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;