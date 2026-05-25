import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (

    <BrowserRouter>

    <Routes>

  <Route path="/" element={<Login />} />

  <Route path="/login" element={<Login />} />

  <Route path="/signup" element={<Signup />} />

 <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
</Routes>
    </BrowserRouter>

  )
}

export default App
