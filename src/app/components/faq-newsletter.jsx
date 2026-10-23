"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaPaperPlane, FaQuestionCircle, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

export default function FAQNewsletter() {
    const [openIndex, setOpenIndex] = useState(0);
    const [email, setEmail] = useState("");

    const faqs = [
        {
            question: "How do I calculate how many tiles I need for my room?",
            answer: "Measure the room length and width in feet, multiply them to get total square footage, and add 10% for cutting waste and spare replacements. You can also use our interactive Tile Room Calculator above!"
        },
        {
            question: "What is the difference between Ceramic and Porcelain tiles?",
            answer: "Porcelain tiles are denser, less porous, and more durable than ceramic tiles, making them ideal for heavy traffic areas and outdoor use. Ceramic tiles are lightweight and budget-friendly for indoor walls and light-traffic floors."
        },
        {
            question: "Do you offer bulk trade or shop owner discounts?",
            answer: "Yes! When you register as a Shop Owner on Tilux, you gain access to wholesale pricing, bulk order management tools, and priority shipping."
        },
        {
            question: "What is your return and damage replacement policy?",
            answer: "We offer a 30-day replacement policy for damaged or broken tiles during transit. Simply report damaged boxes with photos within 48 hours of delivery."
        }
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email address.");
            return;
        }
        toast.success("Thank you for subscribing! Check your inbox for exclusive tile catalog updates.");
        setEmail("");
    };

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-12 bg-[#09090b] text-white relative border-t border-white/[0.06]">
            <div className="max-w-[1600px] mx-auto space-y-24">
                {/* FAQ Section */}
                <div>
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
                        <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
                            Support & Clarity
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                            Frequently Inquired
                        </h2>
                        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
                            Essential details regarding slab sizing, calibration tolerances, and delivery logistics.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-3">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="border border-white/[0.08] hover:border-white/20 rounded-2xl bg-[#121215]/80 backdrop-blur-xl overflow-hidden transition-colors"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                                    className="w-full p-5 sm:p-6 text-left flex justify-between items-center text-sm sm:text-base font-light text-zinc-100 hover:text-amber-200 transition-colors cursor-pointer"
                                >
                                    <span>{faq.question}</span>
                                    <FaChevronDown
                                        className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                                            openIndex === idx ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light border-t border-white/[0.04] pt-4"
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Newsletter Box */}
                <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#121215]/90 border border-white/[0.08] overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
                            <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] inline-block">
                                Surface Releases
                            </span>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
                                Architectural Briefing
                            </h3>
                            <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                                Curated quarterly surface lookbooks, wholesale quarry arrival notices, and high-res specification downloads.
                            </p>
                        </div>

                        <div className="lg:col-span-5">
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                                <input
                                    type="email"
                                    placeholder="Enter your professional email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-grow px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/60 text-xs sm:text-sm transition"
                                />
                                <button
                                    type="submit"
                                    className="px-7 py-3 rounded-full bg-white hover:bg-amber-300 text-zinc-950 font-semibold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                                >
                                    <span>Join Briefing</span>
                                    <FaPaperPlane className="w-2.5 h-2.5" />
                                </button>
                            </form>
                            <p className="text-[11px] text-zinc-500 mt-2 text-center lg:text-left font-light">
                                Zero spam. Unsubscribe with one click anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
