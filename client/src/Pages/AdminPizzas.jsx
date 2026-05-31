import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Veg",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
   const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/pizzas`
);

      setPizzas(res.data.pizzas);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (pizza) => {
    setEditId(pizza._id);

    setFormData({
      name: pizza.name,
      category: pizza.category,
      price: pizza.price,
      image: pizza.image,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/pizzas/${editId}`,
          formData
        );

        toast.success("Pizza Updated 🍕");
        setEditId(null);

      } else {

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/pizzas`,
          formData
        );await axios.post(
  `${import.meta.env.VITE_API_URL}/api/pizzas`,
  formData
);

      fetchPizzas();

    } catch (error) {
      console.log(error);
      toast.error("Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/pizzas/${id}`
      );

      toast.success("Pizza Deleted");

      fetchPizzas();

    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <section className="bg-black text-white min-h-screen py-16 px-6">

      <h1 className="text-5xl font-bold text-center text-orange-500 mb-10">
        Admin Pizza Panel 🍕
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-2xl"
      >

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Pizza Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
          >
            <option>Veg</option>
            <option>Non-Veg</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-gray-700"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 py-3 rounded-lg text-xl font-bold"
          >
            {editId ? "Update Pizza" : "Add Pizza"}
          </button>

        </div>

      </form>

      <div className="max-w-4xl mx-auto mt-10">

        <h2 className="text-3xl font-bold mb-6">
          All Pizzas
        </h2>

        {pizzas.map((pizza) => (
          <div
            key={pizza._id}
            className="bg-gray-900 p-4 rounded-xl mb-4 flex justify-between items-center"
          >

            <div>
              <h3 className="text-xl font-bold">
                {pizza.name}
              </h3>

              <p>{pizza.category}</p>

              <p>₹{pizza.price}</p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => handleEdit(pizza)}
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(pizza._id)}
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default AdminPizzas;