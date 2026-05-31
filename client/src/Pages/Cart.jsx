import React from "react";
import { useNavigate } from "react-router-dom";
const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      parseInt(item.price.replace("₹", "")) * item.quantity,
    0
  );

  const increaseQuantity = (itemName) => {

    const updatedCart = cart.map((item) =>
      item.name === itemName
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (itemName) => {

    const updatedCart = cart.map((item) =>
      item.name === itemName
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    );

    setCart(updatedCart);
  };

  const removeItem = (itemName) => {

    const updatedCart = cart.filter(
      (item) => item.name !== itemName
    );

    setCart(updatedCart);
  };

  return (
    <section className="bg-black text-white min-h-screen py-16 px-6">

      <h1 className="text-5xl font-bold text-center text-orange-500 mb-12">
        Your Cart 🛒
      </h1>

      <div className="max-w-6xl mx-auto grid gap-8">

        {cart.length === 0 ? (
          <div className="text-center text-2xl text-gray-400">
            Your cart is empty 🍕
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6"
              >

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-xl"
                />

                {/* Details */}
                <div className="flex-1">

                  <h2 className="text-3xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-orange-400 text-xl mt-2">
                    {item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mt-5">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.name)
                      }
                      className="bg-red-600 w-10 h-10 rounded-full text-xl"
                    >
                      -
                    </button>

                    <span className="text-2xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.name)
                      }
                      className="bg-green-600 w-10 h-10 rounded-full text-xl"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.name)}
                  className="bg-red-700 hover:bg-red-800 px-5 py-3 rounded-lg"
                >
                  Remove
                </button>

              </div>
            ))}

            {/* Total */}
            <div className="bg-gray-900 rounded-2xl p-8 text-center">

              <h2 className="text-4xl font-bold">
                Total: ₹{totalPrice}
              </h2>

           <button
  onClick={() => navigate("/checkout")}
  className="mt-6 bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-xl text-xl font-bold"
>
  Proceed To Checkout
</button>

            </div>
          </>
        )}

      </div>

    </section>
  );
};

export default Cart;