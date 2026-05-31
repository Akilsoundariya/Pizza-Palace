import React from "react";
import { useNavigate } from "react-router-dom";
import bannerImg from "../assets/hero.png";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section className="bg-black min-h-screen text-white flex items-center px-6 md:px-16">

      <div className="grid md:grid-cols-2 gap-10 items-center w-full">

        {/* LEFT CONTENT */}
        <div>

          <p className="text-orange-500 font-semibold text-lg mb-4">
            🍕 BEST PIZZA IN TOWN
          </p>

          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
            Fresh & Tasty <br />
            Pizza Delivered <span className="text-orange-500">Fast</span>
          </h1>

          <p className="mt-6 text-gray-300 text-base md:text-lg leading-8">
            Enjoy hot cheesy pizzas made with fresh ingredients
            and delivered straight to your doorstep.
          </p>

          <div className="mt-10 flex gap-5">

            <button
              onClick={() => navigate("/menu")}
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl text-lg font-semibold transition"
            >
              Order Now
            </button>

            <button
              onClick={() => navigate("/menu")}
              className="border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-xl text-lg font-semibold transition"
            >
              Explore Menu
            </button>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">

          <img
            src={bannerImg}
            alt="Pizza"
            className="w-full max-w-2xl rounded-3xl shadow-2xl"
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;