"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const AllTiles = () => {
    // store tiles data
    const [tiles, setTiles] = useState([]);

    // loading state
    const [loading, setLoading] = useState(true);

    // error state
    const [error, setError] = useState(null);

    // fetch data when page loads
    useEffect(() => {
        const getTiles = async () => {
            try {
                setLoading(true);

                // fetch from API
                const res = await fetch("https://tilux-server.onrender.com/tiles", {
                    cache: "no-store",
                });

                // handle bad response
                if (!res.ok) throw new Error("Failed to load tiles");

                // convert to json
                const data = await res.json();

                // store data safely
                setTiles(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getTiles();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 px-6 py-10">

            {/* Page Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
                All Premium Tiles
            </h1>

            {/* Loading State */}
            {loading && (
                <p className="text-white text-center text-lg">
                    Loading tiles...
                </p>
            )}

            {/* Error State */}
            {error && (
                <p className="text-red-400 text-center text-lg">
                    {error}
                </p>
            )}

            {/* Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {tiles.map((tile) => (
                        <div
                            key={tile.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.03] transition duration-300 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative w-full h-44">
                                <Image
                                    src={tile.image}
                                    alt={tile.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-grow">

                                {/* Title */}
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {tile.title}
                                </h2>

                                {/* Description */}
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {tile.description}
                                </p>

                                {/* Price + Stock */}
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-black font-bold">
                                        ${tile.price}
                                    </span>

                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${
                                            tile.inStock
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-500"
                                        }`}
                                    >
                                        {tile.inStock ? "In Stock" : "Out of Stock"}
                                    </span>
                                </div>

                                {/* Button */}
                                <button className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
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

export default AllTiles;