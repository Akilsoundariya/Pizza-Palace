import React from "react";
import { toast } from "react-toastify";

import drink1 from "../assets/pp-d1.png";
import drink2 from "../assets/pp-d2.png";
import drink3 from "../assets/pp-d3.png";

const drinks = [
  {
    name: "Coca Cola",
    image: drink1,
    price: "₹99",
  },
  {
    name: "Pepsi",
    image: drink2,
    price: "₹99",
  },
  {
    name: "Mojito",
    image: drink3,
    price: "₹149",
  },
];

const Drinks = ({ cart, setCart }) => {

  const handleAddToCart = (drink) => {

    const existingItem = cart.find(
      (item) => item.name === drink.name
    );

    if (existingItem) {

      const updatedCart = cart.map((item) =>
        item.name === drink.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        { ...drink, quantity: 1 }
      ]);

    }

    toast.success(`${drink.name} added to cart`);
  };

  return (
    <section className="bg-gray-950 text-white py-16 px-6">

      <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">
        Refreshing Drinks 🥤
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {drinks.map((drink, index) => (
          <div
            key={index}
            className="bg-black rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
          >

            <img
              src={drink.image}
              alt={drink.name}
              className="w-full h-64 object-contain bg-black p-2 rounded-t-2xl"
            />

            <div className="p-4">

              <h3 className="text-2xl font-bold">
                {drink.name}
              </h3>

              <p className="text-orange-400 mt-2 font-semibold">
                {drink.price}
              </p>

              <button
                onClick={() => handleAddToCart(drink)}
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

export default Drinks;