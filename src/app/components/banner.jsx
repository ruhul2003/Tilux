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
        <div className="bg-gradient-to-r from-zinc-800 to-gray-700 flex flex-col items-center text-center px-6 pb-20 overflow-hidden">

            <div className="min-h-[85vh] text-center flex flex-col justify-center items-center">
                {/* Top Badge */}
                <p className="flex items-center gap-2 font-semibold text-sm rounded-full bg-[#2F2F2F] px-4 py-2 text-white w-fit mt-8">
                    <IoMdRadioButtonOn className="text-[#FFD700]" />
                    Built On Quality And Trust
                </p>

                {/* Heading */}
                <h1 className="text-white mt-6 text-4xl md:text-6xl font-semibold leading-tight max-w-4xl">
                    Discover Your Perfect Aesthetic
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-400 mt-5 max-w-3xl leading-relaxed">
                    We manufacture high-quality natural marble using advanced
                    processing technology to deliver timeless beauty, strength,
                    and precision for residential and commercial spaces.
                </p>

                {/* Feature list */}
                <ul className="flex flex-wrap justify-center gap-4 mt-8">
                    <li className="flex items-center gap-2 font-medium text-sm rounded-full bg-[#2F2F2F] px-4 py-2 text-white">
                        <FaCheckCircle className="text-[#FFD700]" />
                        Premium Marble Quality
                    </li>

                    <li className="flex items-center gap-2 font-medium text-sm rounded-full bg-[#2F2F2F] px-4 py-2 text-white">
                        <FaCheckCircle className="text-[#FFD700]" />
                        Modern Elegant Designs
                    </li>
                </ul>

                {/* CTA Button */}
                <Link href="/all-tiles" className="bg-white text-black mt-8 rounded-full font-semibold text-lg px-10 py-4 hover:bg-[#FFD700] transition">
                    Browse Now
                </Link>

                {/*  MARQUEE SECTION */}
                {!loading && !error && tiles.length > 0 && (
                    <div className="w-full  mt-16">
                        <Marquee
                            speed={60}
                            pauseOnHover={true}
                            gradient={false}
                            className="bg-black/20 text-white py-4"
                        >
                            New Arrivals:{" "}
                            {tiles.slice(0, 5).map((tile, index) => (
                                <span key={index} className="mx-4">
                                    {tile.title}
                                </span>
                            ))}
                            {"  "} Weekly Feature: Modern Geometric Patterns {"  "}
                            Join the Community
                        </Marquee>
                    </div>
                )}

            </div>
            {/* Loading */}
            {loading && <p className="text-white mt-10">Loading products...</p>}

            {/* Error */}
            {error && <p className="text-red-500 mt-10">{error}</p>}


            <h1 className="text-white mt-16 text-4xl md:text-6xl font-semibold leading-tight max-w-4xl">Featured Products</h1>
            {/* Product Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full max-w-6xl">

                    {tiles.slice(0, 4).map((tile) => (
                        <div
                            key={tile.id}
                            className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl overflow-hidden text-left flex flex-col transition hover:bg-white/10 hover:shadow-2xl"
                        >

                            {/* Product Image */}
                            <div className="relative w-full h-40 overflow-hidden">
                                <Image
                                    src={tile.image}
                                    alt={tile.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-grow text-white">

                                {/* Title */}
                                <h2 className="text-lg font-semibold">
                                    {tile.title}
                                </h2>

                                {/* Description */}
                                <p className="text-sm text-zinc-300 mt-1 line-clamp-2">
                                    {tile.description}
                                </p>

                                {/* Price + Stock */}
                                <div className="mt-4 flex justify-between items-center">

                                    <span className="font-bold text-white text-lg">
                                        ${tile.price}
                                    </span>

                                    <span
                                        className={`text-xs px-3 py-1 rounded-full border ${tile.inStock
                                                ? "bg-green-500/10 text-green-300 border-green-400/20"
                                                : "bg-red-500/10 text-red-300 border-red-400/20"
                                            }`}
                                    >
                                        {tile.inStock ? "In Stock" : "Out of Stock"}
                                    </span>

                                </div>

                                {/* Button */}
                                <button className="mt-4 w-full py-2 rounded-xl border border-white/10 bg-white/10 text-white text-sm font-medium hover:bg-white hover:text-black transition">
                                    Show Details
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Banner;