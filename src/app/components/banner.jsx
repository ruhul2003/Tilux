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
                    <div className="w-screen mt-16 md:mt-24">
                        <Marquee speed={50} pauseOnHover={true} gradient={false} className="bg-black/30 backdrop-blur-sm text-white py-4 border-y border-white/5">
                            <span className="mx-4 font-bold text-[#FFD700]">NEW ARRIVALS:</span>
                            {tiles.slice(0, 8).map((tile, index) => (
                                <span key={index} className="mx-6 flex items-center gap-2">
                                    <span className="h-1 w-1 bg-white rounded-full"></span>
                                    {tile.title}
                                </span>
                            ))}
                        </Marquee>
                    </div>
                )}
            </div>

            {/* ================= PRODUCT SECTION ================= */}
            <div className="w-full max-w-7xl px-2">
                <div className="flex flex-col md:flex-row justify-between items-end mt-20 mb-10 gap-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-left"
                    >
                        <h2 className="text-white text-3xl md:text-5xl font-bold">Featured Products</h2>
                        <div className="h-1.5 w-20 bg-[#FFD700] mt-4 rounded-full"></div>
                    </motion.div>
                    <motion.button
                        onClick={handleProtectedNavigation}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-gray-300 hover:text-[#FFD700] text-sm font-medium transition cursor-pointer"
                    >
                        View All Collection &rarr;
                    </motion.button>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-80 w-full bg-white/5 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                )}

                {error && (
                    <p className="text-red-400 bg-red-400/10 py-4 px-6 rounded-xl border border-red-400/20">{error}</p>
                )}

                {!loading && !error && (
                    <motion.div 
                        variants={productGridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    >
                        {tiles.slice(0, 4).map((tile) => (
                            <motion.div 
                                key={tile.id} 
                                variants={productCardVariants}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3 }}
                                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl overflow-hidden text-left flex flex-col transition-all duration-500 hover:bg-white/10 hover:border-white/20"
                            >
                                <div className="relative w-full h-56 overflow-hidden">
                                    <Image
                                        src={tile.image}
                                        alt={tile.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover group-hover:scale-110 transition duration-700"
                                    />
                                </div>

                                <div className="p-5 flex-grow flex flex-col text-white">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="text-lg font-bold line-clamp-1">{tile.title}</h3>
                                        <span className="font-bold text-[#FFD700] text-lg">${tile.price}</span>
                                    </div>
                                    <p className="text-sm text-zinc-400 mt-2 line-clamp-2 flex-grow">{tile.description}</p>
                                    <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
                                        <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${tile.inStock ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"}`}>
                                            {tile.inStock ? "Available" : "Sold Out"}
                                        </span>
                                        <button
                                            onClick={() => handleDetailNavigation(tile.id)}
                                            className="text-xs font-bold hover:text-[#FFD700] transition cursor-pointer"
                                        >
                                            DETAILS
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
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-zinc-900 rounded-3xl max-w-md w-full p-8 text-center border border-white/10 relative">
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer group"
                            aria-label="Close modal"
                        >
                            <IoClose className="text-2xl group-hover:scale-110 transition-transform" />
                        </button>

                        <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7" />
                            </svg>
                        </div>

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

                        <p className="text-sm text-gray-500 mt-6">
                            Don&apos;t have an account?
                            <button onClick={() => { setShowLoginModal(false); router.push("/signup"); }} className="text-[#FFD700] hover:underline ml-1">
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner;