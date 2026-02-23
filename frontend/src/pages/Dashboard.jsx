import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import OrderCard from "../components/OrderCard";
import { getAllOrders } from "../api/orderApi";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getAllOrders();
        const list = data.orders || data || [];
        setOrders(list);
        if (list.length > 0) {
          setSelectedOrder(list[0]);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load dashboard data. Make sure you are logged in as admin.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = useMemo(() => {
    if (!orders || orders.length === 0) {
      return {
        totalOrders: 0,
        deliveredOrders: 0,
        activeOrders: 0,
        totalRevenue: 0,
      };
    }

    const totalOrders = orders.length;
    const deliveredOrders = orders.filter(
      (o) => o.status === "deliverd"
    ).length;
    const activeOrders = orders.filter(
      (o) => o.status !== "deliverd"
    ).length;
    const totalRevenue = orders.reduce(
      (sum, o) => sum + (Number(o.payment) || 0),
      0
    );

    return { totalOrders, deliveredOrders, activeOrders, totalRevenue };
  }, [orders]);

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const formatDateTime = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">

          {error && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              growth={
                stats.totalOrders
                  ? `${stats.totalOrders} orders in system`
                  : "No orders yet"
              }
            />
            <StatCard
              title="Delivered Orders"
              value={stats.deliveredOrders}
              growth={
                stats.totalOrders
                  ? `${Math.round(
                      (stats.deliveredOrders / (stats.totalOrders || 1)) * 100
                    )}% of all orders`
                  : "-"
              }
            />
            <StatCard
              title="Active Orders"
              value={stats.activeOrders}
              growth={
                stats.activeOrders
                  ? "Preparing / On the way"
                  : "No active orders"
              }
            />
            <StatCard
              title="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              growth={
                stats.totalRevenue
                  ? "Based on all completed orders"
                  : "No revenue yet"
              }
            />
          </div>

          {/* Orders Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Orders List */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

              {loading ? (
                <div className="text-sm text-gray-500">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No orders found yet.
                </div>
              ) : (
                orders
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt) - new Date(a.createdAt)
                  )
                  .slice(0, 6)
                  .map((order) => (
                    <button
                      key={order._id}
                      className="w-full text-left"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <OrderCard
                        id={`#${order._id.slice(-6).toUpperCase()}`}
                        name={order.buyer?.name || "Guest"}
                        time={formatDateTime(order.createdAt)}
                        status={
                          order.status === "deliverd"
                            ? "Delivered"
                            : order.status || "Pending"
                        }
                      />
                    </button>
                  ))
              )}
            </div>

            {/* Order Details */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Order Details</h3>

              {!selectedOrder ? (
                <div className="text-sm text-gray-500">
                  {loading
                    ? "Loading latest order..."
                    : "Select an order from the left to see details."}
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-semibold text-gray-800">
                        #{selectedOrder._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Customer</p>
                      <p className="font-semibold text-gray-800">
                        {selectedOrder.buyer?.name || "Guest"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Placed At</p>
                      <p className="font-semibold text-gray-800">
                        {formatDateTime(selectedOrder.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {selectedOrder.status === "deliverd"
                          ? "Delivered"
                          : selectedOrder.status || "Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Items
                    </h4>
                    {Array.isArray(selectedOrder.foods) &&
                    selectedOrder.foods.length > 0 ? (
                      <div className="space-y-2">
                        {selectedOrder.foods.map((food) => (
                          <div
                            key={food._id || food}
                            className="flex justify-between text-sm text-gray-700"
                          >
                            <span>
                              {food.title || food.name || food.toString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No items attached to this order.
                      </p>
                    )}
                  </div>

                  <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(selectedOrder.payment)}</span>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
