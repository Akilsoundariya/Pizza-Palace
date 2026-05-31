import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-10 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-orange-500">
            Pizza Palace 🍕
          </h2>

          <p className="mt-4 text-gray-400">
            Hot & Fresh pizzas delivered fast to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-orange-400 cursor-pointer">
              Home
            </li>

            <li className="hover:text-orange-400 cursor-pointer">
              Menu
            </li>

            <li className="hover:text-orange-400 cursor-pointer">
              Cart
            </li>

            <li className="hover:text-orange-400 cursor-pointer">
              Login
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            📍 Coimbatore, Tamil Nadu
          </p>

          <p className="text-gray-400 mt-2">
            📞 +91 99443 51625
          </p>

          <p className="text-gray-400 mt-2">
            ✉ akilsoundariyaselvaraj@gmail.com
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © 2026 Pizza Palace. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;