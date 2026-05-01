"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdRadioButtonOn } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Banner = () => {
    const [tiles, setTiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://tilux-server.onrender.com/tiles", {
                    cache: "no-store",
                });
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

    return (
        <div className="bg-gradient-to-r from-zinc-800 to-gray-700 flex flex-col items-center text-center px-4 md:px-6 pb-20 overflow-hidden">
            
            {/* HERO SECTION */}
            <div className="min-h-[70vh] md:min-h-[85vh] text-center flex flex-col justify-center items-center w-full max-w-7xl">
                {/* Top Badge */}
                <p className="flex items-center gap-2 font-semibold text-xs md:text-sm rounded-full bg-[#2F2F2F] px-4 py-2 text-white w-fit mt-8 animate-fade-in">
                    <IoMdRadioButtonOn className="text-[#FFD700]" />
                    Built On Quality And Trust
                </p>

                {/* Heading */}
                <h1 className="text-white mt-6 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl">
                    Discover Your <span className="text-[#FFD700]">Perfect Aesthetic</span>
                </h1>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-300 mt-5 max-w-2xl leading-relaxed">
                    We manufacture high-quality natural marble using advanced
                    processing technology to deliver timeless beauty and strength.
                </p>

                {/* Feature list */}
                <ul className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8">
                    {["Premium Marble Quality", "Modern Elegant Designs"].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 font-medium text-xs md:text-sm rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-white border border-white/10">
                            <FaCheckCircle className="text-[#FFD700]" />
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link href="/all-tiles" className="bg-white text-black mt-10 rounded-full font-bold text-base md:text-lg px-8 md:px-10 py-3 md:py-4 hover:bg-[#FFD700] hover:scale-105 transition-all duration-300 shadow-lg">
                    Browse Now
                </Link>

                {/* MARQUEE SECTION */}
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

            {/* PRODUCT SECTION */}
            <div className="w-full max-w-7xl px-2">
                <div className="flex flex-col md:flex-row justify-between items-end mt-20 mb-10 gap-4">
                    <div className="text-left">
                        <h2 className="text-white text-3xl md:text-5xl font-bold">Featured Products</h2>
                        <div className="h-1.5 w-20 bg-[#FFD700] mt-4 rounded-full"></div>
                    </div>
                    {!loading && (
                         <Link href="/all-tiles" className="text-gray-300 hover:text-[#FFD700] text-sm font-medium transition">
                            View All Collection &rarr;
                         </Link>
                    )}
                </div>

                {/* States */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="h-80 w-full bg-white/5 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                )}
                
                {error && <p className="text-red-400 bg-red-400/10 py-4 px-6 rounded-xl border border-red-400/20">{error}</p>}

                {/* Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {tiles.slice(0, 4).map((tile) => (
                            <div
                                key={tile.id}
                                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl overflow-hidden text-left flex flex-col transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20"
                            >
                                {/* Product Image */}
                                <div className="relative w-full h-56 overflow-hidden">
                                    <Image
                                        src={tile.image}
                                        alt={tile.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover group-hover:scale-110 transition duration-700"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-grow flex flex-col text-white">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="text-lg font-bold line-clamp-1">{tile.title}</h3>
                                        <span className="font-bold text-[#FFD700] text-lg">${tile.price}</span>
                                    </div>

                                    <p className="text-sm text-zinc-400 mt-2 line-clamp-2 flex-grow">
                                        {tile.description}
                                    </p>

                                    <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
                                        <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${
                                            tile.inStock ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
                                        }`}>
                                            {tile.inStock ? "Available" : "Sold Out"}
                                        </span>
                                        <button className="text-xs font-bold hover:text-[#FFD700] transition">
                                            DETAILS +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Banner;