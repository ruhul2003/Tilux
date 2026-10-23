"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdRadioButtonOn } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useSession, API_BASE_URL } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";


const Banner = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [tiles, setTiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    
    // State to handle navigation loading
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${API_BASE_URL}/api/tiles`,
                    { cache: "no-store" }
                );

                if (!res.ok) throw new Error("Failed to fetch data");

                const data = await res.json();
                const safeTiles = Array.isArray(data) ? data : data?.tiles || [];
                setTiles(safeTiles);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    // Protected navigation for "Browse Now" / "View All"
    const handleProtectedNavigation = () => {
        if (session?.user) {
            setIsRedirecting(true);
            router.push("/all-tiles");
        } else {
            setShowLoginModal(true);
        }
    };

    // Protected navigation for "Details" button
    const handleDetailNavigation = (id) => {
        if (session?.user) {
            setIsRedirecting(true);
            router.push(`/all-tiles/${id}`);
        } else {
            setShowLoginModal(true);
        }
    };

    // Motion variants
    const heroVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const productGridVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const productCardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div 
            className="w-full flex flex-col items-center text-center px-4 sm:px-6 lg:px-12 pb-24 overflow-hidden relative bg-[#09090b]"
        >
            {/* Subtle Minimal Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[550px] bg-gradient-to-b from-amber-500/[0.04] via-amber-500/[0.01] to-transparent pointer-events-none blur-3xl -z-10" />
            <div className="absolute top-1/3 right-10 w-96 h-96 bg-zinc-800/20 blur-[140px] pointer-events-none -z-10" />
            
            {/* ================= REDIRECT LOADING OVERLAY ================= */}
            {isRedirecting && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        {/* Gold Spinner */}
                        <div className="w-14 h-14 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin"></div>
                        {/* Inner Pulse */}
                        <div className="absolute w-10 h-10 rounded-full border border-white/10 animate-pulse bg-white/[0.02]"></div>
                    </div>
                    <p className="mt-5 text-zinc-300 font-medium tracking-[0.25em] uppercase text-[11px] animate-pulse">
                        Loading Surface Catalog
                    </p>
                </div>
            )}

            {/* ================= HERO SECTION ================= */}
            <div className="min-h-[72vh] md:min-h-[85vh] text-center flex flex-col justify-center items-center w-full max-w-[1600px] pt-12 md:pt-20">
                <motion.p 
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 font-medium text-xs tracking-wider uppercase rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-1.5 text-zinc-300 w-fit"
                >
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse"></span>
                    Architectural Porcelain & Natural Marble
                </motion.p>

                <motion.h1 
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-white mt-8 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] max-w-6xl"
                >
                    Crafted Surfaces For <br className="hidden sm:inline" />
                    <span className="font-serif italic font-normal bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent">
                        Modern Spaces
                    </span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm sm:text-base md:text-lg text-zinc-400 font-light mt-6 max-w-2xl leading-relaxed"
                >
                    Precision-calibrated stone slabs and designer tiles sourced from premier global quarries, engineered for timeless residential and commercial architecture.
                </motion.p>


                <motion.ul 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center gap-3 mt-8"
                >
                    {["Direct Italian Quarry Sourcing", "Laser Calibrated Precision", "Carbon Neutral Packaging"].map((feature, i) => (
                        <motion.li 
                            key={i} 
                            variants={itemVariants}
                            className="flex items-center gap-2 font-normal text-xs rounded-full bg-white/[0.03] border border-white/[0.07] px-4 py-1.5 text-zinc-300 backdrop-blur-sm"
                        >
                            <span className="text-amber-400 text-[10px]">✦</span>
                            {feature}
                        </motion.li>
                    ))}
                </motion.ul>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                    <motion.button
                        onClick={handleProtectedNavigation}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-white text-zinc-950 rounded-full font-semibold text-xs sm:text-sm tracking-wide uppercase px-8 py-3.5 hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
                    >
                        Explore Collection
                    </motion.button>
                    <motion.button
                        onClick={handleProtectedNavigation}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="rounded-full border border-white/15 text-zinc-300 hover:text-white hover:bg-white/[0.04] font-medium text-xs sm:text-sm tracking-wide uppercase px-7 py-3.5 transition-colors cursor-pointer"
                    >
                        View Lookbook
                    </motion.button>
                </div>


                {/* ================= MARQUEE ================= */}
                {!loading && !error && tiles.length > 0 && (
                    <div className="w-screen mt-20 md:mt-28">
                        <Marquee speed={38} pauseOnHover={true} gradient={false} className="bg-[#0c0c0e]/70 backdrop-blur-md text-zinc-300 py-3.5 border-y border-white/[0.06]">
                            <span className="mx-6 font-semibold text-amber-300/90 text-xs tracking-[0.25em] uppercase">
                                Curated Slabs:
                            </span>
                            {tiles.slice(0, 8).map((tile, index) => (
                                <span key={index} className="mx-8 flex items-center gap-3 text-xs tracking-wider uppercase text-zinc-300 font-light hover:text-white transition-colors">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50"></span>
                                    {tile.title}
                                </span>
                            ))}
                        </Marquee>
                    </div>
                )}

            </div>

            {/* ================= PRODUCT SECTION ================= */}
            <div className="w-full max-w-[1600px] px-2 sm:px-4 lg:px-8 mt-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-left"
                    >
                        <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
                            Curated Catalog
                        </span>
                        <h2 className="text-white text-3xl md:text-5xl font-light tracking-tight mt-1.5">
                            Featured Surfaces
                        </h2>
                    </motion.div>
                    <motion.button
                        onClick={handleProtectedNavigation}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-xs font-medium tracking-wider uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                        <span>Full Collection</span>
                        <span>&rarr;</span>
                    </motion.button>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-88 w-full bg-white/[0.03] border border-white/[0.06] animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                )}

                {error && (
                    <p className="text-red-400 bg-red-400/10 py-4 px-6 rounded-xl border border-red-400/20 text-xs">{error}</p>
                )}

                {!loading && !error && (
                    <motion.div 
                        variants={productGridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {tiles.slice(0, 4).map((tile) => (
                            <motion.div 
                                key={tile.id} 
                                variants={productCardVariants}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.3 }}
                                className="group rounded-2xl border border-white/[0.08] bg-[#121215]/80 hover:bg-[#18181c] hover:border-white/20 shadow-lg overflow-hidden text-left flex flex-col transition-all duration-300"
                            >
                                <div className="relative w-full h-64 overflow-hidden bg-zinc-950">
                                    <Image
                                        src={tile.image}
                                        alt={tile.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition duration-700 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className={`text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full backdrop-blur-md border ${
                                            tile.inStock 
                                                ? "text-emerald-300 bg-emerald-950/60 border-emerald-500/30" 
                                                : "text-zinc-400 bg-zinc-900/70 border-zinc-700/50"
                                        }`}>
                                            {tile.inStock ? "In Stock" : "Limited"}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-baseline gap-2">
                                            <h3 className="text-base font-semibold text-white tracking-tight line-clamp-1 group-hover:text-amber-200 transition-colors">
                                                {tile.title}
                                            </h3>
                                            <span className="font-semibold text-amber-300 text-base">
                                                ${tile.price}
                                            </span>
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                                            {tile.description}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex justify-between items-center">
                                        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-light">
                                            {tile.category || "Porcelain"}
                                        </span>
                                        <button
                                            onClick={() => handleDetailNavigation(tile.id)}
                                            className="text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1"
                                        >
                                            <span>Details</span>
                                            <span className="text-amber-400">&rarr;</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* ================= LOGIN MODAL ================= */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-[#121215]/95 border border-white/[0.08] rounded-3xl max-w-sm w-full p-7 text-center relative shadow-2xl backdrop-blur-2xl">
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition cursor-pointer text-xs group"
                            aria-label="Close modal"
                        >
                            <IoClose className="text-base" />
                        </button>

                        <div className="w-11 h-11 mx-auto mb-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center text-lg">
                            ✦
                        </div>

                        <h2 className="text-xl font-bold text-white tracking-tight mb-2">Member Access</h2>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">You need to be logged in to view surface specifications.</p>

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
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Banner;