import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axios from "axios"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {

  setEmail("")
  setPassword("")

}, [])

  const handleLogin = async (e) => {

    e.preventDefault()

    // EMPTY FIELD VALIDATION

    if (!email || !password) {

      toast.error("Please fill all fields")

      return

    }

    try {

      setLoading(true)

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password
        }
      )

      // USER NOT FOUND

      if (res.data.message === "User Not Found") {

        setLoading(false)

        toast.error("User Not Found")

        return

      }

      // WRONG PASSWORD

      if (res.data.message === "Invalid Password") {

        setLoading(false)

        toast.error("Wrong Password")

        return

      }

      // SUCCESS LOGIN

 toast.success(res.data.message)

localStorage.setItem("token", res.data.token)
localStorage.setItem("role", res.data.role)
localStorage.setItem("email", email)

setLoading(false)

if (res.data.role === "admin") {
  navigate("/dashboard")
} else {
  navigate("/home")
}

    } catch (error) {

      setLoading(false)

      toast.error("Something went wrong")

    }

  }

  return (

    <div className="flex justify-center items-center h-screen bg-[#F8F9FA]">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-80"
      >

        <h2 className="text-3xl font-bold text-center text-orange-500 mb-5">
          Login
        </h2>

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

              "Login"
          }

        </button>

        <p className="text-sm mt-3 text-center">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-orange-500"
          >
            Signup
          </Link>

        </p>

      </form>

    </div>

  )

}

export default Login