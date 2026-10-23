"use client";

import React, { useState, useId } from "react";
import { motion } from "framer-motion";
import { FaCalculator, FaLayerGroup, FaRulerCombined, FaCoins, FaCheckCircle } from "react-icons/fa";
import { BiSquareRounded } from "react-icons/bi";

export default function TileCalculator() {
    const lengthId = useId();
    const widthId = useId();
    const tileSizeId = useId();

    const [roomLength, setRoomLength] = useState(12); // in feet
    const [roomWidth, setRoomWidth] = useState(10);  // in feet
    const [tileSize, setTileSize] = useState("12x12"); // inches
    const [wastePercent, setWastePercent] = useState(10); // 10% default extra
    const [pricePerSqFt, setPricePerSqFt] = useState(4.5);

    // Calculate room area in sq ft
    const roomArea = (parseFloat(roomLength) || 0) * (parseFloat(roomWidth) || 0);

    // Tile dimensions in feet
    const getTileDimensions = (sizeStr) => {
        switch (sizeStr) {
            case "6x6": return { w: 0.5, h: 0.5, sqft: 0.25 };
            case "12x12": return { w: 1, h: 1, sqft: 1.0 };
            case "12x24": return { w: 1, h: 2, sqft: 2.0 };
            case "24x24": return { w: 2, h: 2, sqft: 4.0 };
            case "24x48": return { w: 2, h: 4, sqft: 8.0 };
            default: return { w: 1, h: 1, sqft: 1.0 };
        }
    };

    const tileInfo = getTileDimensions(tileSize);
    const totalAreaWithWaste = roomArea * (1 + wastePercent / 100);
    const tilesNeeded = Math.ceil(totalAreaWithWaste / tileInfo.sqft);
    const totalEstimatedCost = (totalAreaWithWaste * pricePerSqFt).toFixed(2);
    const boxesNeeded = Math.ceil(tilesNeeded / 10); // Assume 10 tiles per box

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#0c0c0e] text-white relative overflow-hidden border-t border-white/[0.06]">
            {/* Background Accent Blur */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-[1600px] mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
                    <span className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase">
                        Estimation Engine
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Tile & Slab Calculator
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                        Calculate exact surface coverage, offcut buffer allowances, and material budgeting before placing orders.
                    </p>
                </div>

                {/* Main Interactive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Controls Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 bg-[#121215]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col justify-between"
                    >
                        <h3 className="text-lg font-light text-white mb-6 flex items-center gap-2.5">
                            <FaRulerCombined className="text-amber-400 w-4 h-4" />
                            <span>Room & Slab Dimensions</span>
                        </h3>


                        <div className="space-y-6">
                            {/* Room Dimensions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={lengthId} className="block text-sm font-medium text-gray-300 mb-2">
                                        Room Length (ft)
                                    </label>
                                    <input
                                        id={lengthId}
                                        type="number"
                                        min="1"
                                        max="200"
                                        value={roomLength}
                                        onChange={(e) => setRoomLength(Math.max(1, parseFloat(e.target.value) || 0))}
                                        className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={widthId} className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                                        Room Width (ft)
                                    </label>
                                    <input
                                        id={widthId}
                                        type="number"
                                        min="1"
                                        max="200"
                                        value={roomWidth}
                                        onChange={(e) => setRoomWidth(Math.max(1, parseFloat(e.target.value) || 0))}
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400/60 transition"
                                    />
                                </div>
                            </div>

                            {/* Tile Size Selection */}
                            <div>
                                <label htmlFor={tileSizeId} className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                                    Tile Format (Inches)
                                </label>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                    {["6x6", "12x12", "12x24", "24x24", "24x48"].map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setTileSize(size)}
                                            className={`py-2 px-3 rounded-xl font-medium text-xs border transition text-center cursor-pointer ${
                                                tileSize === size
                                                    ? "bg-white text-zinc-950 border-white font-semibold shadow-sm"
                                                    : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                                            }`}
                                        >
                                            {size}&quot;
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Wastage Factor & Estimated Cost Per Sq Ft */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs uppercase tracking-wider text-zinc-400">Offcut Allowance</span>
                                        <span className="text-xs font-semibold text-amber-300">+{wastePercent}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="5"
                                        max="25"
                                        step="5"
                                        value={wastePercent}
                                        onChange={(e) => setWastePercent(parseInt(e.target.value))}
                                        className="w-full accent-amber-400 cursor-pointer"
                                    />
                                    <span className="text-[11px] text-zinc-500 mt-1 block">
                                        Accounts for angle cuts, borders, and spares.
                                    </span>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs uppercase tracking-wider text-zinc-400">Rate / Sq Ft ($)</span>
                                        <span className="text-xs font-semibold text-amber-300">${pricePerSqFt}</span>
                                    </div>
                                    <input
                                        type="number"
                                        step="0.5"
                                        min="1"
                                        max="100"
                                        value={pricePerSqFt}
                                        onChange={(e) => setPricePerSqFt(Math.max(0.5, parseFloat(e.target.value) || 0))}
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-amber-400/60 transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 bg-[#121215]/80 border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative"
                    >
                        <div>
                            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                                <h4 className="text-base font-light text-white flex items-center gap-2">
                                    <FaCoins className="text-amber-400" /> Material Estimate
                                </h4>
                                <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 font-medium border border-amber-400/20">
                                    Live Calculation
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
                                    <span className="text-[11px] text-zinc-400 block mb-1">Net Surface Area</span>
                                    <span className="text-2xl font-light text-white">{roomArea} <span className="text-xs font-normal text-zinc-500">sq ft</span></span>
                                </div>
                                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
                                    <span className="text-[11px] text-zinc-400 block mb-1">With +{wastePercent}% Waste</span>
                                    <span className="text-2xl font-light text-amber-200">{totalAreaWithWaste.toFixed(1)} <span className="text-xs font-normal text-zinc-500">sq ft</span></span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6 text-xs">
                                <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                                    <span className="text-zinc-400 flex items-center gap-2">
                                        <BiSquareRounded className="text-amber-400" /> Total Slabs / Tiles:
                                    </span>
                                    <span className="font-semibold text-white text-sm">{tilesNeeded} pcs</span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
                                    <span className="text-zinc-400 flex items-center gap-2">
                                        <FaLayerGroup className="text-amber-400" /> Boxes (~10 pcs/box):
                                    </span>
                                    <span className="font-semibold text-white text-sm">{boxesNeeded} boxes</span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-zinc-400 flex items-center gap-2">
                                        <FaCheckCircle className="text-emerald-400" /> Cutting Allowance:
                                    </span>
                                    <span className="font-medium text-zinc-300">{(totalAreaWithWaste - roomArea).toFixed(1)} sq ft</span>
                                </div>
                            </div>
                        </div>

                        {/* Estimated Price Footer Card */}
                        <div className="mt-4 p-5 rounded-2xl bg-amber-400/[0.05] border border-amber-400/20 text-center">
                            <span className="text-[11px] uppercase tracking-wider text-amber-300/80 font-medium block mb-1">Estimated Material Budget</span>
                            <span className="text-3xl sm:text-4xl font-light text-white tracking-tight">${totalEstimatedCost}</span>
                            <span className="text-[10px] text-zinc-500 block mt-1">Excludes freight delivery and installation setting materials</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

