import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = ({ cart, setCart }) => {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      parseInt(item.price.replace("₹", "")) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handlePlaceOrder = async () => {

  if (
    !formData.name ||
    !formData.phone ||
    !formData.address ||
    !formData.city ||
    !formData.pincode
  ) {
    toast.error("Please fill all details");
    return;
  }

  try {

    const orderData = {
      customerName: formData.name,
      email: localStorage.getItem("email"),
      phone: formData.phone,
      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      items: cart,
      total: totalPrice,
      status: "Preparing",
    };

    await axios.post(
      '${import.meta.env.VITE_API_URL}/api/orders',
      orderData
    );

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: totalPrice,
      status: "Preparing",
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    localStorage.removeItem("cart");
    setCart([]);

    navigate("/success");

  } catch (error) {

    console.log(error);

  toast.error("Failed to place order");

  }
};  return (
    <section className="bg-black text-white min-h-screen py-16 px-6">

      <h1 className="text-5xl font-bold text-center text-orange-500 mb-10">
        Checkout 🧾
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Delivery Details */}
        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-3xl font-bold mb-6">
            Delivery Details
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black border border-gray-700"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black border border-gray-700"
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black border border-gray-700"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black border border-gray-700"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black border border-gray-700"
            />

            <select
              name="payment"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black border border-gray-700"
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
            </select>

          </div>

        </div>

        {/* Order Summary */}
        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-3xl font-bold mb-6">
            Order Summary
          </h2>

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b border-gray-700"
            >
              <span>
                {item.name} x {item.quantity}
              </span>

              <span>
                ₹{parseInt(item.price.replace("₹", "")) * item.quantity}
              </span>
            </div>
          ))}

          <h3 className="text-3xl font-bold mt-6 text-orange-400">
            Total: ₹{totalPrice}
          </h3>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 bg-green-600 hover:bg-green-700 w-full py-4 rounded-xl text-xl font-bold"
          >
            Place Order
          </button>

        </div>

      </div>

    </section>
  );
};

export default Checkout;