"use client";

import React, { useEffect, useState } from "react";
import { useSession, API_BASE_URL } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

const MyOrdersPage = () => {
    const { data: session, isPending } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isPending && !session?.user) return;

        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("tilux_token");
                const res = await fetch(`${API_BASE_URL}/api/orders`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error("Failed to load orders");
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [session, isPending]);

    if (!isPending && !session?.user) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-gray-400 mb-8">You must be logged in to view your orders.</p>
                    <Link href="/login" className="px-8 py-4 bg-[#FFD700] text-black font-bold rounded-2xl hover:bg-yellow-400 transition">
                        Login Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 py-12 px-4 md:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto space-y-8"
            >
                <h1 className="text-4xl font-bold text-white text-center mb-2">My Orders</h1>
                <p className="text-gray-300 text-center mb-8">Track status and details of your purchased tiles.</p>

                {loading ? (
                    <div className="text-center text-white py-12 animate-pulse">Loading your orders...</div>
                ) : error ? (
                    <div className="text-red-400 bg-red-400/10 p-6 rounded-2xl text-center">{error}</div>
                ) : orders.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center text-zinc-300">
                        <p className="text-xl mb-6">You have not placed any orders yet.</p>
                        <Link href="/all-tiles" className="px-6 py-3 bg-[#FFD700] text-black font-bold rounded-xl hover:bg-yellow-400 transition">
                            Browse Collection
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <motion.div 
                                key={order.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                                        <Image
                                            src={order.tileImage}
                                            alt={order.tileTitle}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{order.tileTitle}</h3>
                                        <p className="text-zinc-400 text-sm">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p className="text-[#FFD700] font-semibold mt-2">${order.tilePrice} &times; {order.quantity}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3 w-full md:w-auto border-t md:border-none border-white/5 pt-4 md:pt-0">
                                    <span className="text-lg font-bold text-white">Total: ${order.totalPrice}</span>
                                    <span className={`text-xs px-3 py-1 rounded-full border uppercase tracking-wider font-bold ${
                                        order.status === 'Completed' ? 'bg-green-500/10 text-green-300 border-green-400/20' :
                                        order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-300 border-blue-400/20' :
                                        'bg-yellow-500/10 text-yellow-300 border-yellow-400/20'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
            <Toaster position="top-center" />
        </div>
    );
};

export default MyOrdersPage;
