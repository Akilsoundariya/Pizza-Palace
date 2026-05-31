import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        ${import.meta.env.VITE_API_URL}/api/orders
      );

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        { status }
      );

      toast.success("Status Updated");

      fetchOrders();

    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Status");
    }
  };

  return (
    <section className="bg-black text-white min-h-screen py-16 px-6">

      <h1 className="text-5xl font-bold text-center text-orange-500 mb-10">
        Admin Orders 📦
      </h1>

      <div className="max-w-5xl mx-auto space-y-5">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-900 p-6 rounded-xl"
          >

            <h2 className="text-2xl font-bold">
              {order.customerName}
            </h2>

            <p>Phone: {order.phone}</p>

            <p>Address: {order.address}</p>

            <p>Total: ₹{order.total}</p>

            <p>
              Date:{" "}
              {new Date(order.createdAt).toLocaleDateString("en-GB")}
            </p>

            <div className="mt-3">
              <label>Status: </label>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }
                className="bg-black border border-gray-700 p-2 rounded ml-2"
              >
                <option value="Preparing">
                  Preparing
                </option>

                <option value="Out for Delivery">
                  Out for Delivery
                </option>

                <option value="Delivered">
                  Delivered
                </option>
              </select>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default AdminOrders;