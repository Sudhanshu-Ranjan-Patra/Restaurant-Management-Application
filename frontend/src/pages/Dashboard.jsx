import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import OrderCard from "../components/OrderCard";
//import { useNavigate } from "react-router-dom";

function Dashboard() {
   
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar/>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Orders" value="1750" growth="+8.56%" />
            <StatCard title="Total Delivered" value="567" growth="+9.6%" />
            <StatCard title="Total Revenue" value="₹1,29,750" growth="-9.6%" />
            <StatCard title="Total Cancelled" value="125" growth="+12.3%" />
          </div>

          {/* Orders Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Orders List */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">All Orders</h3>

              <OrderCard
                id="#12334"
                name="Preshit Pimple"
                time="10:30AM | Today"
                status="Delayed"
              />

              <OrderCard
                id="#16318"
                name="Shardav Jarus"
                time="9:45PM | 14 May"
                status="Completed"
              />
            </div>

            {/* Order Details */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Order Details</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>1 x Chole Kulche</span>
                  <span>₹120</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹25</span>
                </div>

                <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹145</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Mark as Delivered
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
