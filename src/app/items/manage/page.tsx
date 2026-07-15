'use client';
import { useState, useEffect } from 'react';
import { Trash2, Loader2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ManageItems() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

    // ১. ডেটাবেস থেকে ডেটা লোড করা
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch('/api/items');
            const data = await res.json();
            if (res.ok) setItems(data);
        } catch (err) {
            console.error('Error fetching items:', err);
        } finally {
            setLoading(false);
        }
    };

    // ২. ডেটাবেস থেকে আইটেম ডিলিট করার ফাংশন
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this gear?')) return;

        setDeleteLoadingId(id); // নির্দিষ্ট বাটনে লোডার দেখানোর জন্য

        try {
            const res = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // ডিলিট সফল হলে ফ্রন্টএন্ড স্টেট থেকে ফিল্টার করে রিয়েল-টাইমে রিমুভ করা
                setItems(items.filter((item) => item._id !== id));
                alert('Gear deleted successfully!');
            } else {
                alert('Failed to delete the item.');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setDeleteLoadingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500 gap-2">
                <Loader2 className="animate-spin text-accent w-8 h-8" />
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary">Manage Your Listed Gears</h1>
                    <p className="text-sm text-gray-500">Track, update, or remove your uploaded gadgets.</p>
                </div>
                <Link href="/items/add" className="bg-accent text-white px-4 py-2 rounded-gear text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all">
                    <Plus size={16} /> Add New Gear
                </Link>
            </div>

            {items.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-gear overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <th className="p-4">Gear Details</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Location</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {items.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-bold text-primary">{item.title}</td>
                                    <td className="p-4 text-gray-500">{item.category}</td>
                                    <td className="p-4 font-semibold text-primary">${item.price}/day</td>
                                    <td className="p-4 text-gray-500">{item.location}</td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            disabled={deleteLoadingId === item._id}
                                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all inline-flex items-center justify-center disabled:opacity-50"
                                            title="Delete Item"
                                        >
                                            {deleteLoadingId === item._id ? (
                                                <Loader2 className="animate-spin w-4 h-4" />
                                            ) : (
                                                <Trash2 size={18} />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-12 bg-white border border-gray-200 rounded-gear">
                    <p className="text-gray-500 font-medium">You haven't listed any gears yet.</p>
                </div>
            )}
        </div>
    );
}
