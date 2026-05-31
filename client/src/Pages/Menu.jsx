import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Menu = ({ cart, setCart }) => {
  const [pizzaData, setPizzaData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await axios.get(
          "${import.meta.env.VITE_API_URL}/api/pizzas"
        );

        setPizzaData(res.data.pizzas);
        console.log(res.data);
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

  const filteredPizzas = (pizzaData || []).filter((pizza) => {
    const matchesSearch = pizza.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      pizza.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="bg-black text-white min-h-screen py-16 px-6">

      <h1 className="text-5xl font-bold text-center text-orange-500 mb-10">
        Our Menu 🍕
      </h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">

        <input
          type="text"
          placeholder="Search pizza..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 outline-none w-full md:w-80"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 outline-none"
        >
          <option>All</option>
          <option>Veg</option>
          <option>Non-Veg</option>
        </select>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {filteredPizzas.map((pizza) => (
          <div
            key={pizza._id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
          >

            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-72 object-cover"
            />

            <div className="p-5">

              <h2 className="text-3xl font-bold">
                {pizza.name}
              </h2>

              <p className="text-gray-400 mt-2">
                {pizza.category}
              </p>

              <p className="text-orange-400 mt-2 text-xl font-semibold">
                ₹{pizza.price}
              </p>

              <button
                onClick={() => handleAddToCart(pizza)}
                className="mt-5 bg-red-600 hover:bg-red-700 w-full py-3 rounded-lg font-semibold"
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

export default Menu;