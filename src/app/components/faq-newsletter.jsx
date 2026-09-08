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
        <section className="py-20 px-4 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white relative">
            <div className="max-w-6xl mx-auto space-y-20">
                {/* FAQ Section */}
                <div>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-3">
                            <FaQuestionCircle className="w-4 h-4" />
                            <span>Got Questions?</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-amber-200 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="border border-zinc-800 rounded-2xl bg-zinc-900/60 backdrop-blur-xl overflow-hidden transition"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                                    className="w-full p-5 text-left flex justify-between items-center text-base font-semibold text-white hover:text-amber-300 transition"
                                >
                                    <span>{faq.question}</span>
                                    <FaChevronDown
                                        className={`w-4 h-4 text-amber-400 transition-transform duration-300 ${
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
                                            className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-zinc-800/60 pt-3"
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
                <div className="relative rounded-3xl p-8 md:p-14 bg-gradient-to-r from-amber-500/20 via-zinc-900 to-zinc-950 border border-amber-500/30 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-semibold">
                                <FaEnvelope /> Stay Updated
                            </div>
                            <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                                Subscribe for Exclusive Design Trends & Offers
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base">
                                Get monthly tile trend lookbooks, trade discounts, and architectural inspiration directly in your inbox.
                            </p>
                        </div>

                        <div className="lg:col-span-5">
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email address..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 text-white placeholder-gray-500 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-amber-500/20"
                                >
                                    <FaPaperPlane /> Join Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
