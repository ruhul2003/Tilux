"use client";

import React, { useEffect, useState } from "react";
import { useSession, API_BASE_URL } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

const ManageOrdersPage = () => {
    const { data: session, isPending } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        if (!isPending && !session?.user) return;
        fetchOrders();
    }, [session, isPending]);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("tilux_token");
            const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                toast.success(`Order marked as ${newStatus}`);
                fetchOrders();
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to update status");
            }
        } catch (err) {
            toast.error("Network error updating order status");
        }
    };

    if (!isPending && session?.user?.role !== "shop_owner") {
        return (
            <div className="min-h-screen bg-gradient-to-r from-zinc-800 to-gray-700 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-gray-400 mb-8">Only shop owners are authorized to access this page.</p>
                    <Link href="/" className="px-8 py-4 bg-[#FFD700] text-black font-bold rounded-2xl hover:bg-yellow-400 transition">
                        Back to Home
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
                className="max-w-6xl mx-auto space-y-8"
            >
                <h1 className="text-4xl font-bold text-white text-center mb-2">Manage Customer Orders</h1>
                <p className="text-gray-300 text-center mb-8">Process orders, ship items, and track order fulfillment states.</p>

                {loading ? (
                    <div className="text-center text-white py-12 animate-pulse">Loading customer orders...</div>
                ) : error ? (
                    <div className="text-red-400 bg-red-400/10 p-6 rounded-2xl text-center">{error}</div>
                ) : orders.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center text-zinc-300">
                        <p className="text-xl">No customer orders found in the database.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-zinc-300 text-sm font-semibold">
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Product Info</th>
                                    <th className="p-4">Order Summary</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-center">Fulfill Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <p className="font-semibold text-white">Buyer ID: {order.buyerId.slice(-6)}</p>
                                            <p className="text-xs text-zinc-400">{order.buyerEmail}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                                                    <Image
                                                        src={order.tileImage}
                                                        alt={order.tileTitle}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{order.tileTitle}</p>
                                                    <p className="text-xs text-zinc-400">Price: ${order.tilePrice}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-white">${order.totalPrice}</p>
                                            <p className="text-xs text-zinc-400">Qty: {order.quantity}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-xs px-2.5 py-1 rounded-full border uppercase tracking-wider font-bold ${
                                                order.status === 'Completed' ? 'bg-green-500/10 text-green-300 border-green-400/20' :
                                                order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-300 border-blue-400/20' :
                                                'bg-yellow-500/10 text-yellow-300 border-yellow-400/20'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">
                                                {order.status === "Pending" && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(order.id, "Shipped")}
                                                        className="px-3 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-lg text-xs font-semibold hover:bg-blue-500/40 transition cursor-pointer"
                                                    >
                                                        Mark Shipped
                                                    </button>
                                                )}
                                                {order.status === "Shipped" && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(order.id, "Completed")}
                                                        className="px-3 py-1.5 bg-green-500/20 text-green-300 border border-green-400/30 rounded-lg text-xs font-semibold hover:bg-green-500/40 transition cursor-pointer"
                                                    >
                                                        Mark Completed
                                                    </button>
                                                )}
                                                {order.status === "Completed" && (
                                                    <span className="text-xs text-zinc-500 italic">Fully Processed</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
            <Toaster position="top-center" />
        </div>
    );
};

export default ManageOrdersPage;
