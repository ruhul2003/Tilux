"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Testimonials = () => {
    const reviews = [
        {
            name: "Sophia Carter",
            role: "Principal Interior Architect",
            company: "Studio Luxe",
            quote: "The quality of marble sourced from Tilux is spectacular. The laser precision calibration meant zero cutting waste on site. My clients are absolutely in love with the Carrara finishes.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        },
        {
            name: "Marcus Vance",
            role: "Chief Developer",
            company: "Vance & Co Builders",
            quote: "As developers, we look for strength and reliability. Tilux granite collections provide exactly that. Ordering bulk container shipments is streamlined, and customer support is world-class.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
        }
    ];

    return (
        <section className="bg-[#0c0c0e] py-24 px-4 sm:px-6 lg:px-12 border-t border-white/[0.06] overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 space-y-2"
                >
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
                        Industry Endorsements
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Trusted By Architects
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
                        Perspectives from leading interior architects and custom estate builders constructing with Tilux materials.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {reviews.map((rev, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="bg-[#121215]/80 border border-white/[0.08] hover:border-white/20 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between space-y-8 cursor-pointer transition-all duration-300"
                        >
                            <p className="text-zinc-200 text-base sm:text-lg font-light leading-relaxed">
                                &ldquo;{rev.quote}&rdquo;
                            </p>
                            
                            <div className="flex items-center gap-4 border-t border-white/[0.06] pt-6">
                                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/20">
                                    <Image 
                                        src={rev.avatar}
                                        alt={rev.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm sm:text-base tracking-tight">{rev.name}</h4>
                                    <p className="text-zinc-500 text-xs">{rev.role}, <span className="text-amber-300">{rev.company}</span></p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

