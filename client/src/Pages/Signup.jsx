import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignup = async (e) => {

    e.preventDefault()

    // EMPTY FIELD VALIDATION

    if (!name || !email || !password) {

      toast.error("Please fill all fields")

      return

    }

    // PASSWORD VALIDATION

    if (password.length < 6) {

      toast.error("Password must be 6 characters")

      return

    }

    // EMAIL VALIDATION

    if (!email.includes("@")) {

      toast.error("Enter valid email")

      return

    }

    try {

      setLoading(true)

      const res = await axios.post(
        "https://pizza-palace-h4kz.onrender.com/api/auth/register",
        {
          name,
          email,
          password
        }
      )

      toast.success(res.data.message)

      // CLEAR INPUTS

      setName("")
      setEmail("")
      setPassword("")

      setLoading(false)

      // MOVE LOGIN PAGE

      navigate("/login")

    } catch (error) {

      setLoading(false)

      toast.error("Something went wrong")

    }

  }

  return (

    <div className="flex justify-center items-center h-screen bg-[#F8F9FA]">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-lg w-80"
      >

        <h2 className="text-3xl font-bold text-center text-orange-500 mb-5">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

        </div>

        <button
          disabled={loading}
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 flex justify-center items-center"
        >

          {
            loading ?

              <ClipLoader
                size={20}
                color="#fff"
              />

              :

              "Signup"
          }

        </button>

        <p className="text-sm mt-3 text-center">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-orange-500"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  )

}

export default Signup