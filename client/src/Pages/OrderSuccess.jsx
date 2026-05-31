import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <section className="bg-black text-white min-h-screen flex items-center justify-center px-6">

      <div className="bg-gray-900 p-10 rounded-2xl text-center max-w-xl">

        <h1 className="text-6xl mb-4">🎉</h1>

        <h2 className="text-4xl font-bold text-green-500">
          Order Placed Successfully!
        </h2>

        <p className="mt-4 text-gray-300 text-lg">
          Thank you for ordering from Pizza Palace.
          Your delicious pizza is being prepared.
        </p>

        <Link to="/home">
          <button className="mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl font-bold">
            Back To Home
          </button>
        </Link>

      </div>

    </section>
  );
};

export default OrderSuccess;