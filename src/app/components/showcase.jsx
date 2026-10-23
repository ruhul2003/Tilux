"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Showcase = () => {
    const categories = [
        {
            title: "Royal Italian Marble",
            description: "Timeless luxury with pristine white surfaces and delicate organic veining.",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
            link: "/all-tiles"
        },
        {
            title: "Midnight Granite",
            description: "Ultra-durable polished slabs engineered for modern kitchens and patios.",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
            link: "/all-tiles"
        },
        {
            title: "Earthy Ceramic & Wood",
            description: "Warm organic textures combining natural beauty with waterproof utility.",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            link: "/all-tiles"
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        }
    };

    return (
        <section className="bg-[#0c0c0e] py-24 px-4 sm:px-6 lg:px-12 border-t border-white/[0.06] overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-2 text-left"
                    >
                        <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
                            Surface Typology
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                            Architectural Finishes
                        </h2>
                        <p className="text-zinc-400 text-sm md:text-base max-w-2xl font-light leading-relaxed">
                            Meticulously calibrated stone and porcelain formats curated for modern residences, hospitality, and commercial facades.
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link href="/all-tiles">
                            <button className="px-6 py-3 rounded-full border border-white/15 hover:border-white/30 text-zinc-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] text-xs font-semibold uppercase tracking-wider transition cursor-pointer">
                                View Full Collection &rarr;
                            </button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                >
                    {categories.map((cat, idx) => (
                        <motion.div 
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.3 }}
                            className="group relative rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/20 bg-zinc-950 h-[520px] flex flex-col justify-end p-8 sm:p-10 shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            {/* Background Image */}
                            <Image 
                                src={cat.image}
                                alt={cat.title}
                                fill
                                className="object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                                unoptimized
                            />
                            
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10"></div>

                            {/* Content */}
                            <div className="relative z-20 space-y-3">
                                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-amber-300/80">
                                    Series 0{idx + 1}
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                                    {cat.title}
                                </h3>
                                <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                    {cat.description}
                                </p>
                                <div className="pt-2">
                                    <Link href={cat.link} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-amber-300 hover:text-white transition-colors">
                                        <span>Examine Specifications</span>
                                        <span>&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>

    );
};

export default Showcase;
