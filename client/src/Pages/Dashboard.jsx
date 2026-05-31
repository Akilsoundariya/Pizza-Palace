import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalPizzas: 0,
    totalRevenue: 0,
    deliveredOrders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "${import.meta.env.VITE_API_URL}/api/dashboard"
        );

        setStats(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

 
  return (
    <section className="bg-black text-white min-h-screen py-16 px-6">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold text-orange-500">
          Admin Dashboard 📊
        </h1>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h2 className="text-4xl font-bold text-orange-400">
            {stats.totalOrders}
          </h2>
          <p>Total Orders</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h2 className="text-4xl font-bold text-orange-400">
            {stats.totalPizzas}
          </h2>
          <p>Total Pizzas</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h2 className="text-4xl font-bold text-orange-400">
            ₹{stats.totalRevenue}
          </h2>
          <p>Total Revenue</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h2 className="text-4xl font-bold text-orange-400">
            {stats.deliveredOrders}
          </h2>
          <p>Delivered Orders</p>
        </div>

      </div>
      <div className="flex justify-center gap-6 mt-10">

  <button
    onClick={() => navigate("/admin/pizzas")}
    className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"
  >
    Manage Pizzas 🍕
  </button>

  <button
    onClick={() => navigate("/admin/orders")}
    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold"
  >
    Manage Orders 📦
  </button>

</div>

    </section>
  );
};

export default Dashboard;