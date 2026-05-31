import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FeaturedPizzas = ({ cart, setCart }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
       const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/pizzas`
);

        setPizzas(res.data.pizzas.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPizzas();
  }, []);

  const handleAddToCart = (pizza) => {
    const existingItem = cart.find(
      (item) => item.name === pizza.name
    );

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.name === pizza.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        { ...pizza, quantity: 1 }
      ]);
    }

    toast.success(`${pizza.name} added to cart`);
  };

  return (
    <section className="bg-black text-white py-16 px-6">

      <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">
        Featured Pizzas 🍕
      </h2>

      <div className="grid md:grid-cols-4 gap-8">

        {pizzas.map((pizza) => (
          <div
            key={pizza._id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
          >

            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">

              <h3 className="text-2xl font-bold">
                {pizza.name}
              </h3>

              <p className="text-orange-400 mt-2 font-semibold">
                ₹{pizza.price}
              </p>

              <button
                onClick={() => handleAddToCart(pizza)}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg w-full"
              >
                Add To Cart
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default FeaturedPizzas;