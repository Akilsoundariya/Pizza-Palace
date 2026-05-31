import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/pp-logo.png";

const Navbar = ({ cart }) => {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-3 md:px-6 py-4 flex justify-between items-center shadow-lg flex-wrap">

      <Link
        to={role === "admin" ? "/dashboard" : "/home"}
        className="flex items-center gap-3"
      >
        <img
          src={logo}
          alt="Pizza Palace Logo"
          className="w-12 h-12 rounded-full object-cover"
        />

        <h1 className="text-lg md:text-2xl font-bold text-orange-500">
          Pizza Palace
        </h1>
      </Link>

      <ul className="flex gap-2 md:gap-6 text-sm md:text-lg font-medium flex-wrap">

        {role === "admin" ? (
          <>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-orange-400 transition"
              >
                Dashboard
              </Link>
            </li>
 <li>
              <Link
                to="/menu"
                className="hover:text-orange-400 transition"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/admin/pizzas"
                className="hover:text-orange-400 transition"
              >
                Manage Pizzas
              </Link>
            </li>

            <li>
              <Link
                to="/admin/orders"
                className="hover:text-orange-400 transition"
              >
                Manage Orders
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/home"
                className="hover:text-orange-400 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/menu"
                className="hover:text-orange-400 transition"
              >
                Menu
              </Link>
            </li>

            <li>
              <Link
                to="/orders"
                className="hover:text-orange-400 transition"
              >
                Orders
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="hover:text-orange-400 transition"
              >
                Cart ({cart?.length || 0})
              </Link>
            </li>
          </>
        )}

        <li>
          <button
            onClick={handleLogout}
            className="hover:text-orange-400 transition"
          >
            Logout
          </button>
        </li>

      </ul>

    </nav>
  );
};

export default Navbar;