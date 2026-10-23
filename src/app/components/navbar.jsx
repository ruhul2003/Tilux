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

    const baseLinks = [
        { name: "Home", path: "/" },
        { name: "All Tiles", path: "/all-tiles" },
    ];

    if (session?.user) {
        if (session.user.role === "shop_owner") {
            baseLinks.push({ name: "Manage Orders", path: "/manage-orders" });
        } else {
            baseLinks.push({ name: "My Orders", path: "/my-orders" });
        }
        baseLinks.push({ name: "My Profile", path: "/profile" });
    }

    const navLinks = baseLinks;


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
            <header className="w-full bg-[#09090b]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-6 lg:px-12 py-3.5 sticky top-0 z-50">
                <nav className="max-w-[1600px] mx-auto flex items-center justify-between">

                    {/* ================= LEFT SIDE: LOGO ================= */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src={logo}
                            alt="Tilux Logo"
                            width={90}
                            height={32}
                            priority
                            className="object-contain w-20 lg:w-[92px] transition-opacity duration-200 group-hover:opacity-90"
                        />
                        <span className="hidden sm:inline-block text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase border-l border-zinc-800 pl-3">
                            Surfaces
                        </span>
                    </Link>

                    {/* ================= CENTER: DESKTOP NAVIGATION ================= */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                        {navLinks.map((link) => (
                            <div key={link.path}>
                                {link.name !== "Home" ? (
                                    <button
                                        onClick={() => handleProtectedNavigation(link.path)}
                                        className="relative text-zinc-300 hover:text-white text-sm font-medium tracking-wide transition-colors py-1 group cursor-pointer bg-transparent border-none outline-none"
                                    >
                                        {link.name}
                                        <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-amber-400/90 transition-all duration-300 group-hover:w-full"></span>
                                    </button>
                                ) : (
                                    <Link
                                        href={link.path}
                                        className="relative text-zinc-300 hover:text-white text-sm font-medium tracking-wide transition-colors py-1 group"
                                    >
                                        {link.name}
                                        <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-amber-400/90 transition-all duration-300 group-hover:w-full"></span>
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
                                            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all cursor-pointer"
                                        >
                                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                                <img
                                                    src={profileImageUrl}
                                                    alt={session.user.name || "User"}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="hidden md:block text-left">
                                                <p className="text-xs font-semibold text-zinc-200 leading-none mb-1">{session.user.name}</p>
                                                <p className="text-[10px] text-zinc-500 leading-none">{session.user.role === "shop_owner" ? "Shop Owner" : "Member"}</p>
                                            </div>
                                        </div>
                                        <ul className="dropdown-content mt-3 w-56 rounded-2xl border border-white/[0.08] bg-[#121215]/95 backdrop-blur-2xl p-1.5 shadow-2xl z-50">
                                            <li>
                                                <Link href="/profile" className="block px-3.5 py-2.5 hover:bg-white/[0.06] rounded-xl text-zinc-200 text-xs font-medium transition">
                                                    View Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <button onClick={handleLogout} className="w-full text-left px-3.5 py-2.5 hover:bg-red-500/10 hover:text-red-400 rounded-xl text-zinc-400 text-xs font-medium transition cursor-pointer">
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    /* LOGGED OUT: Desktop Auth Buttons (Hidden on mobile) */
                                    <div className="hidden lg:flex items-center gap-3">
                                        <Link
                                            href="/login"
                                            className="px-4 py-2 text-xs font-medium tracking-wide text-zinc-300 hover:text-white transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-semibold tracking-wide transition shadow-sm"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}

                                {/* MOBILE HAMBURGER MENU (Always on the right) */}
                                <div className="dropdown dropdown-end lg:hidden">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition active:scale-95"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-zinc-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </div>

                                    <ul className="menu dropdown-content mt-3 w-64 rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/95 backdrop-blur-2xl p-3 shadow-2xl space-y-1.5 z-50">
                                        {/* Navigation Links */}
                                        {navLinks.map((link) => (
                                            <li key={link.path}>
                                                <Link
                                                    href={link.path}
                                                    className="text-zinc-200 text-sm rounded-xl px-3.5 py-2.5 hover:bg-white/[0.06] transition block"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}

                                        {/* MOBILE AUTH: Only shows inside menu when logged out */}
                                        {!session?.user && !isPending && (
                                            <div className="pt-3 mt-2 border-t border-white/[0.08] flex flex-col gap-2">
                                                <Link
                                                    href="/login"
                                                    className="w-full text-center py-2.5 rounded-xl border border-white/10 text-zinc-200 text-xs font-medium hover:bg-white/[0.06] transition"
                                                >
                                                    Sign In
                                                </Link>
                                                <Link
                                                    href="/signup"
                                                    className="w-full text-center py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-semibold transition"
                                                >
                                                    Get Started
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
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#121215]/95 border border-white/[0.08] rounded-3xl max-w-sm w-full p-7 text-center relative shadow-2xl backdrop-blur-2xl">
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer text-xs"
                        >
                            ✕
                        </button>
                        <div className="w-11 h-11 mx-auto mb-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center text-lg">
                            ✦
                        </div>
                        <h2 className="text-xl font-bold text-white tracking-tight mb-2">Member Access</h2>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                            Sign in to explore high-resolution surfaces, pricing catalogs, and tile specifications.
                        </p>
                        <div className="flex flex-col gap-2.5">
                            <button
                                onClick={() => { setShowLoginModal(false); router.push("/login"); }}
                                className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-sm"
                            >
                                Sign In Now
                            </button>
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="border border-white/10 hover:bg-white/[0.05] text-zinc-400 hover:text-zinc-200 font-medium py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                            >
                                Continue Browsing
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default NavBar;