"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaSlidersH, FaSun, FaMoon, FaCheck, FaArrowRight, FaMagic } from "react-icons/fa";
import { BiExpandAlt } from "react-icons/bi";

export default function RoomVisualizer() {
    const [selectedRoom, setSelectedRoom] = useState("bathroom");
    const [selectedTileStyle, setSelectedTileStyle] = useState("carrara");
    const [lighting, setLighting] = useState("daylight");

    const rooms = {
        bathroom: {
            name: "Luxury Spa Bathroom",
            description: "High-moisture resistance with slip-proof texture and polished marble aesthetics.",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
            recommendedTile: "Carrara White & Gold Calacatta"
        },
        living: {
            name: "Contemporary Living Room",
            description: "Large format porcelain tiles creating seamless, expansive open-concept floors.",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
            recommendedTile: "Nordic Slate & Concrete Gray"
        },
        kitchen: {
            name: "Modern Kitchen & Backsplash",
            description: "Stain-resistant glazed ceramic tiles that withstand heat, grease, and heavy spills.",
            image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
            recommendedTile: "Nero Marquina & Herringbone Mosaic"
        },
        terrace: {
            name: "Outdoor Terrace & Patio",
            description: "20mm extra-thick frost-resistant pavers with R11 anti-slip safety rating.",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            recommendedTile: "Terracotta & Natural Stone Slate"
        }
    };

    const tileStyles = [
        { id: "carrara", name: "Carrara White Marble", color: "#E8E8E8", accent: "text-gray-200", badge: "Polished" },
        { id: "nero", name: "Nero Marquina Black", color: "#1A1A1A", accent: "text-amber-400", badge: "Matt Finish" },
        { id: "calacatta", name: "Calacatta Gold Vein", color: "#F4EAD3", accent: "text-amber-300", badge: "Glossy" },
        { id: "slate", name: "Nordic Slate Gray", color: "#4A5568", accent: "text-blue-300", badge: "Anti-Slip" }
    ];

    const currentRoom = rooms[selectedRoom];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#09090b] text-white relative overflow-hidden border-t border-white/[0.06]">
            {/* Background Glow */}
            <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-zinc-800/[0.1] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-[1600px] mx-auto relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
                    <span className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase">
                        Interactive Simulator
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Surface Visualizer
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                        Experiment with space environments, slab veining, and ambient lighting to envision real-world architectural installations.
                    </p>
                </div>

                {/* Main Simulator Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121215]/80 border border-white/[0.08] rounded-3xl p-6 md:p-10 backdrop-blur-2xl shadow-2xl">

                    {/* Controls Sidebar */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* 1. Room Type Selector */}
                        <div>
                            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 block mb-3 flex items-center gap-2">
                                <FaSlidersH className="text-amber-400 w-3 h-3" /> 1. Room Environment
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(rooms).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedRoom(key)}
                                        className={`py-2.5 px-3.5 rounded-xl text-xs font-medium transition text-left border flex items-center justify-between cursor-pointer ${
                                            selectedRoom === key
                                                ? "bg-white/[0.08] text-white border-amber-400/60 shadow-sm"
                                                : "bg-white/[0.02] text-zinc-400 border-white/[0.06] hover:bg-white/[0.05] hover:text-zinc-200"
                                        }`}
                                    >
                                        <span className="capitalize">{key}</span>
                                        {selectedRoom === key && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Tile Finish Selector */}
                        <div>
                            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 block mb-3">
                                2. Surface Finish & Texture
                            </label>
                            <div className="space-y-2">
                                {tileStyles.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedTileStyle(style.id)}
                                        className={`w-full p-3 rounded-xl text-xs font-medium transition border flex items-center justify-between cursor-pointer ${
                                            selectedTileStyle === style.id
                                                ? "bg-white/[0.08] border-amber-400/60 text-white shadow-sm"
                                                : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                                                style={{ backgroundColor: style.color }}
                                            />
                                            <span className="font-medium text-zinc-200">{style.name}</span>
                                        </div>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400 font-light">
                                            {style.badge}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Lighting Presets */}
                        <div>
                            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 block mb-3">
                                3. Illumination Ambience
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setLighting("daylight")}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border transition cursor-pointer ${
                                        lighting === "daylight"
                                            ? "bg-amber-400/15 text-amber-300 border-amber-400/50"
                                            : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200"
                                    }`}
                                >
                                    <FaSun className="text-amber-400 w-3.5 h-3.5" /> Daylight 5500K
                                </button>
                                <button
                                    onClick={() => setLighting("evening")}
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border transition cursor-pointer ${
                                        lighting === "evening"
                                            ? "bg-indigo-500/15 text-indigo-300 border-indigo-400/50"
                                            : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200"
                                    }`}
                                >
                                    <FaMoon className="text-indigo-400 w-3.5 h-3.5" /> Warm 2700K
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Live Preview Display */}
                    <div className="lg:col-span-7 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedRoom + selectedTileStyle + lighting}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4 }}
                                className={`relative h-[360px] md:h-[460px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl ${
                                    lighting === "evening" ? "brightness-90 contrast-110 hue-rotate-15" : ""
                                }`}
                            >
                                <Image
                                    src={currentRoom.image}
                                    alt={currentRoom.name}
                                    fill
                                    className="object-cover"
                                />

                                {/* Overlay Gradient & Specs */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-7 flex flex-col justify-end">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-medium uppercase tracking-wider">
                                            Interactive Preview
                                        </span>
                                        <span className="text-xs text-amber-300 font-light flex items-center gap-1">
                                            <BiExpandAlt /> {currentRoom.name}
                                        </span>
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-light text-white tracking-tight mb-2">{currentRoom.name}</h4>
                                    <p className="text-zinc-300 text-xs md:text-sm font-light line-clamp-2 mb-5 leading-relaxed">{currentRoom.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                                        <div>
                                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Recommended Surface</span>
                                            <span className="text-xs sm:text-sm font-medium text-amber-300">{currentRoom.recommendedTile}</span>
                                        </div>

                                        <Link href="/all-tiles">
                                            <button className="px-5 py-2.5 rounded-full bg-white hover:bg-amber-300 text-zinc-950 font-semibold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 shadow-sm">
                                                <span>Shop Look</span>
                                                <FaArrowRight className="w-2.5 h-2.5" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
