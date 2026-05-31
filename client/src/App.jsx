import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedPizzas from "./components/FeaturedPizzas";
import Offers from "./components/Offers";
import Footer from "./components/Footer";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import Orders from "./Pages/Orders";
import AdminPizzas from "./Pages/AdminPizzas";
import AdminOrders from "./Pages/AdminOrders";

function AppContent() {

  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar cart={cart} />}

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/home"
          element={
            <>
              <Hero />
              <FeaturedPizzas
                cart={cart}
                setCart={setCart}
              />
              <Offers />
              <Footer />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu"
          element={
            <Menu
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/success"
          element={<OrderSuccess />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/admin/pizzas"
          element={<AdminPizzas />}
        />

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;