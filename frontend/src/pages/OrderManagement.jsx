import { useEffect, useState } from "react";
import {
    getAllOrders,
    updateOrderStatus,
} from "../api/orderApi";

function OrderManagement() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const { data } = await getAllOrders();
        setOrders(data.orders);
    };

    useEffect(() => {
        fetchOrders();
    }, []);



    const handleStatusChange = async (id, status) => {
        await updateOrderStatus(id, status);
        fetchOrders();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                Order Management
            </h2>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-t">
                                <td className="p-4">
                                    {order._id.slice(-6)}
                                </td>
                                <td className="p-4">₹{order.payment}</td>
                                <td className="p-4">{order.status}</td>
                                <td className="p-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                        className="border p-2 rounded"
                                    >
                                        <option>Pending</option>
                                        <option>Preparing</option>
                                        <option>Out for Delivery</option>
                                        <option>Delivered</option>
                                        <option>Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderManagement;
