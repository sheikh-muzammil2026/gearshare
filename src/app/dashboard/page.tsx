'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Eye, ShoppingBag, DollarSign, ListFilter } from 'lucide-react';

// ডামি ইউজার প্রোডাক্ট ডাটা (Production-Ready)
const INITIAL_MY_GEARS = [
    {
        id: '1',
        title: 'Sony Alpha IV Mirrorless Camera',
        category: 'Professional Camera',
        price: 35,
        earnings: 245,
        status: 'Active',
    },
    {
        id: '2',
        title: 'DJI Mavic 3 Pro Drone',
        category: 'Drones & Action Cams',
        price: 50,
        earnings: 400,
        status: 'Rented',
    },
];

export default function Dashboard() {
    const [myGears, setMyGears] = useState(INITIAL_MY_GEARS);

    // আইটেম ডিলিট করার হ্যান্ডলার (অ্যাসাইনমেন্ট রিকোয়ারমেন্ট লজিক)
    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this listed gear?')) {
            const updatedGears = myGears.filter(item => item.id !== id);
            setMyGears(updatedGears);
        }
    };

    return (
        <div className="min-h-screen bg-neutralBg px-4 py-8 md:py-12 animate-[fadeIn_0.5s_ease-out]">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Block with Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-primary tracking-tight">Lender Dashboard</h1>
                        <p className="text-gray-500 text-sm">Manage your listed tech devices and track performance stats.</p>
                    </div>
                    <Link
                        href="/items/add"
                        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-gear text-sm transition-all shadow-lg shadow-blue-500/10 active:scale-95"
                    >
                        <Plus size={16} /> List Another Gear
                    </Link>
                </div>

                {/* Analytic Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-gear border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-gear text-accent">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Listed</p>
                            <h3 className="text-2xl font-black text-primary mt-0.5">{myGears.length} Items</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-gear border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-gear text-green-600">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Earnings</p>
                            <h3 className="text-2xl font-black text-primary mt-0.5">
                                ${myGears.reduce((acc, current) => acc + current.earnings, 0)}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-gear border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-amber-50 rounded-gear text-amber-600">
                            <ListFilter size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Active Rentals</p>
                            <h3 className="text-2xl font-black text-primary mt-0.5">
                                {myGears.filter(item => item.status === 'Rented').length} Gears
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Manage Table Section */}
                <div className="bg-white rounded-gear border border-gray-200 shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-bold text-lg text-primary">Your Listed Tech Gears</h2>
                    </div>

                    {myGears.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
                                        <th className="px-6 py-4">Gear Details</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Price / Day</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm font-medium text-primary">
                                    {myGears.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-800">{item.title}</td>
                                            <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                            <td className="px-6 py-4 font-extrabold">${item.price}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${item.status === 'Active'
                                                        ? 'bg-green-50 text-green-700 border border-green-100'
                                                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/explore/${item.id}`}
                                                        className="p-2 text-gray-400 hover:text-accent hover:bg-gray-100 rounded-gear transition-all"
                                                        title="View Item"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-gear transition-all"
                                                        title="Delete Item"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Empty State Inside Table */
                        <div className="text-center py-12 p-6">
                            <p className="text-gray-500 font-semibold">You haven't listed any tech gears yet.</p>
                            <p className="text-gray-400 text-xs mt-1">Start renting out your gear today to earn extra income!</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}