const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

const router = express.Router()

// REGISTER API

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body

    // CHECK EXISTING USER

    const existingUser = await User.findOne({ email })

    if (existingUser) {

      return res.json({
        message: "Email already exists"
      })

    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10)

    // CREATE USER

    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    await user.save()

    res.json({
      message: "User Registered Successfully"
    })

  } catch (error) {

    console.log(error)

    res.json({
      message: "Something went wrong"
    })

  }

})



// LOGIN API

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body

    // CHECK USER

    const user = await User.findOne({ email })

    if (!user) {

      return res.json({
        message: "User Not Found"
      })

    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {

      return res.json({
        message: "Invalid Password"
      })

    }

    // GENERATE TOKEN

    const token = jwt.sign(
      { id: user._id },
      "secretkey"
    )

    res.json({
      message: "Login Success",
      token
    })

  } catch (error) {

    console.log(error)

    res.json({
      message: "Something went wrong"
    })

  }

})

module.exports = router