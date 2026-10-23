"use client";

import React from "react";
import { FaGem, FaShippingFast, FaCheckDouble, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => {
    const featuresList = [
        {
            icon: <FaGem className="w-8 h-8 text-[#FFD700]" />,
            title: "Premium Quality Material",
            description: "Directly sourced from the finest quarries in Italy, Spain, and Brazil, ensuring peak durability and peerless aesthetics."
        },
        {
            icon: <FaShippingFast className="w-8 h-8 text-[#FFD700]" />,
            title: "Secure Global Shipping",
            description: "Custom protective packaging and tracked container transit ensure your premium tiles arrive in pristine condition."
        },
        {
            icon: <FaCheckDouble className="w-8 h-8 text-[#FFD700]" />,
            title: "Architect Grade Quality",
            description: "Every batch passes strict laser dimensional validation and optical calibration to ensure seamless installation."
        },
        {
            icon: <FaLeaf className="w-8 h-8 text-[#FFD700]" />,
            title: "Sustainable Sourcing",
            description: "We partner exclusively with certified eco-friendly quarries committed to carbon footprint reduction."
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.6, 
                ease: "easeOut" 
            } 
        }
    };

    return (
        <section className="bg-[#09090b] py-24 px-4 sm:px-6 lg:px-12 border-t border-white/[0.06] overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16 space-y-2"
                >
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
                        Engineering Standards
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                        Designed For Permanence
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
                        Precision calibration, laser-guided cutting tolerances, and certified responsible quarry extraction.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {featuresList.map((feat, idx) => (
                        <motion.div 
                            key={idx}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            className="bg-[#121215]/80 border border-white/[0.08] hover:border-white/20 rounded-2xl p-8 hover:bg-[#18181c] transition-all duration-300 shadow-lg group flex flex-col justify-between cursor-pointer"
                        >
                            <div className="mb-6 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-amber-300 group-hover:border-amber-400/40 transition-colors">
                                {feat.icon}
                            </div>
                            <div>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mb-1">
                                    0{idx + 1}
                                </span>
                                <h3 className="text-lg font-medium text-white mb-2 tracking-tight">{feat.title}</h3>
                                <p className="text-zinc-400 text-xs leading-relaxed font-light">{feat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;

