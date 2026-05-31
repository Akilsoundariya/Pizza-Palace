import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders`
        );

        const userEmail = localStorage.getItem("email");

const userOrders = res.data.orders.filter(
  (order) => order.email === userEmail
);

setOrders(userOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="bg-black text-white min-h-screen py-16 px-6">

      <h1 className="text-5xl font-bold text-center text-orange-500 mb-12">
        Order History 📦
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">

        {orders.length === 0 ? (
          <div className="text-center text-2xl text-gray-400">
            No Orders Found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-900 p-6 rounded-2xl"
            >

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  Order #{order._id.slice(-6)}
                </h2>

                <span className="text-orange-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>

              </div>

              <div className="mt-4 space-y-2">

                {order.items.map((item, index) => (
                  <p key={index}>
                    🍕 {item.name} x {item.quantity}
                  </p>
                ))}

              </div>

              <div className="flex justify-between items-center mt-6">

                <h3 className="text-xl font-bold">
                  Total: ₹{order.total}
                </h3>

                <span className="bg-green-600 px-4 py-2 rounded-lg">
                  {order.status}
                </span>

              </div>

            </div>
          ))
        )}

      </div>

    </section>
  );
};

export default Orders;