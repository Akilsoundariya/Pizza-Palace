const authRoutes = require("./routes/authRoutes")
const orderRoutes = require("./routes/orderRoutes");
const pizzaRoutes = require("./routes/pizzaRoutes");
const Order = require("./models/Order");
const Pizza = require("./models/Pizza");


const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/orders", orderRoutes);
app.use("/api/pizzas", pizzaRoutes);

app.get("/", (req, res) => {
  res.send("Pizza Palace API Running")
})
app.get("/api/dashboard", async (req, res) => {
  try {
    const orders = await Order.find();
    const pizzas = await Pizza.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    const deliveredOrders = orders.filter(
      (order) => order.status === "Delivered"
    ).length;

    res.json({
      totalOrders: orders.length,
      totalPizzas: pizzas.length,
      totalRevenue,
      deliveredOrders,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err))

app.listen(5000, () => {
  console.log("Server running on port 5000")
})