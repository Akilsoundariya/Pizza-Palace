import React from "react";

import offerImg from "../assets/pp-offer1.png";

const Offers = () => {
  return (
    <section className="bg-black text-white py-16 px-6">

      <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">
        Special Offers 🔥
      </h2>

      <div className="max-w-6xl mx-auto">

        <img
          src={offerImg}
          alt="Offer Banner"
          className="w-full rounded-2xl shadow-2xl"
        />

      </div>

    </section>
  );
};

export default Offers;