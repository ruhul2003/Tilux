"use client";

import React, { useEffect, useState } from "react";
import { IoMdRadioButtonOn } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

const Banner = () => {
    const [tiles, setTiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:5000/tiles", { cache: "no-store" });
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

            {/* Top Badge - Reduced top margin */}
            <p className="flex items-center gap-2 font-semibold text-sm rounded-full bg-[#2F2F2F] px-4 py-2 text-white w-fit mt-8">
                <IoMdRadioButtonOn className="text-[#FFD700]" />
                Built On Quality And Trust
            </p>

            <h1 className="text-white mt-6 text-4xl md:text-6xl font-semibold leading-tight max-w-4xl">
                Discover Your Perfect Aesthetic
            </h1>

            <p className="text-lg text-gray-400 mt-5 max-w-3xl leading-relaxed">
                We manufacture high-quality natural marble using advanced
                processing technology to deliver timeless beauty, strength,
                and precision for residential and commercial spaces.
            </p>

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

            <button className="bg-white text-black mt-8 rounded-full font-semibold text-lg px-10 py-4 hover:bg-[#FFD700] transition">
                Browse Now
            </button>

            {loading && <p className="text-white mt-10">Loading products...</p>}
            {error && <p className="text-red-500 mt-10">{error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full max-w-6xl">
                    {tiles.slice(0, 4).map((tile) => (
                        <div key={tile.id} className="bg-white rounded-xl overflow-hidden shadow-lg text-left flex flex-col">
                            <Image
                                src={tile.image}
                                alt={tile.title}
                                width={400}
                                height={300}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4 flex-grow">
                                <h2 className="text-lg font-semibold text-gray-800">{tile.title}</h2>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tile.description}</p>
                                <div className="mt-3 flex justify-between items-center">
                                    <span className="font-bold text-black">${tile.price}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${tile.inStock ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                                        {tile.inStock ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>
                                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
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