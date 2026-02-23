import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/orderApi";

// Mapping between backend status values and user-friendly labels
const STATUS_OPTIONS = [
  { value: "preparing", label: "Preparing" },
  { value: "prepare", label: "Prepared" },
  { value: "on the way", label: "On the Way" },
  { value: "deliverd", label: "Delivered" },
];

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await getAllOrders();
            // Note: If your backend returns an array directly, use 'data'
            // If it's wrapped, use 'data.orders'
            setOrders(data.orders || data); 
            setError(null);
        } catch (err) {
            setError("Failed to fetch orders. Are you logged in as Admin?");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            // Optimistic Update: Change UI immediately
            const previousOrders = [...orders];
            setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));

            await updateOrderStatus(id, newStatus);
            // No need to fetchOrders() here if the update was successful 
            // as the state is already updated.
        } catch (err) {
            alert("Failed to update status. Reverting changes.");
            fetchOrders(); // Revert to database state on error
        }
    };

    if (loading && orders.length === 0)
        return <div className="p-6 text-center">Loading orders...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
                <button 
                    onClick={fetchOrders}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Refresh List
                </button>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold">Order ID</th>
                            <th className="p-4 font-semibold">Customer</th>
                            <th className="p-4 font-semibold">Foods</th>
                            <th className="p-4 font-semibold">Amount</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan="5" className="p-10 text-center text-gray-500">No orders found.</td></tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 font-mono text-sm text-blue-600">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="p-4">
                                        {order.buyer?.name || "Guest"}
                                    </td>
                                    <td className="p-4">
                                        {Array.isArray(order.foods) && order.foods.length > 0 ? (
                                            <ul className="list-disc pl-4">
                                                {order.foods.map((food) => (
                                                    <li key={food._id || food}>
                                                        {food.title || food.name || food.toString()}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="text-gray-400">No foods</span>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium text-green-700">
                                        ₹{order.payment}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                            {STATUS_OPTIONS.find(s => s.value === order.status)?.label || order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <select
                                            disabled={order.status === "deliverd"}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="border p-2 rounded bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        >
                                            {STATUS_OPTIONS.map((status) => (
                                                <option key={status.value} value={status.value}>
                                                    {status.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Helper to style status badges
const getStatusColor = (status) => {
    switch (status) {
        case "Pending": return "bg-yellow-100 text-yellow-800";
        case "Preparing": return "bg-blue-100 text-blue-800";
        case "Delivered": return "bg-green-100 text-green-800";
        case "Cancelled": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
    }
};

export default OrderManagement;