const express = require("express");
const router = express.Router();

const Pizza = require("../models/Pizza");

// Get all pizzas
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    res.status(200).json({
      success: true,
      pizzas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Add pizza
router.post("/", async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);

    res.status(201).json({
      success: true,
      pizza,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
//delete
router.delete("/:id", async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Pizza Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      pizza,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;