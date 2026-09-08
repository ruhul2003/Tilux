"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdRadioButtonOn } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useSession } from "@/lib/auth-client";
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
                    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/tiles`,
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
            className="flex flex-col items-center text-center px-4 md:px-6 pb-20 overflow-hidden relative"
            style={{
                backgroundImage: "linear-gradient(to right, rgba(24, 24, 27, 0.95), rgba(39, 39, 42, 0.9)), url('/marble-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
            }}
        >
            
            {/* ================= REDIRECT LOADING OVERLAY ================= */}
            {isRedirecting && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        {/* Gold Spinner */}
                        <div className="w-16 h-16 rounded-full border-4 border-[#FFD700]/10 border-t-[#FFD700] animate-spin"></div>
                        {/* Inner Pulse */}
                        <div className="absolute w-12 h-12 rounded-full border border-white/10 animate-pulse bg-white/5"></div>
                    </div>
                    <p className="mt-6 text-white font-bold tracking-[0.2em] uppercase text-xs animate-pulse">
                        Loading Product Details
                    </p>
                </div>
            )}

            {/* ================= HERO SECTION ================= */}
            <div className="min-h-[70vh] md:min-h-[85vh] text-center flex flex-col justify-center items-center w-full max-w-7xl">
                <motion.p 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 font-semibold text-xs md:text-sm rounded-full bg-[#2F2F2F] px-4 py-2 text-white w-fit mt-8"
                >
                    <IoMdRadioButtonOn className="text-[#FFD700]" />
                    Built On Quality And Trust
                </motion.p>

                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-white mt-6 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl"
                >
                    Discover Your{" "}
                    <span className="text-[#FFD700]">Perfect Aesthetic</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-base md:text-lg text-gray-300 mt-5 max-w-2xl leading-relaxed"
                >
                    We manufacture high-quality natural marble using advanced processing technology to deliver timeless beauty and strength.
                </motion.p>

                <motion.ul 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8"
                >
                    {["Premium Marble Quality", "Modern Elegant Designs"].map((feature, i) => (
                        <motion.li 
                            key={i} 
                            variants={itemVariants}
                            className="flex items-center gap-2 font-medium text-xs md:text-sm rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-white border border-white/10"
                        >
                            <FaCheckCircle className="text-[#FFD700]" />
                            {feature}
                        </motion.li>
                    ))}
                </motion.ul>

                <motion.button
                    onClick={handleProtectedNavigation}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#FFD700", color: "#000" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black mt-10 rounded-full font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 transition-all duration-300 shadow-lg cursor-pointer"
                >
                    Browse Now
                </motion.button>

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