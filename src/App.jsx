import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar_pr from './components/NavBar/NavBar.jsx'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Register from './pages/Register/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import Trade from './pages/Trade/Trade.jsx'
import Orders from './pages/Orders/Orders.jsx'
import Portfolio from './pages/Portfolio/Portfolio.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='appContainer'>
    <NavBar_pr />
     
        <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/trade' element={
            <ProtectedRoute>
              <Trade />
            </ProtectedRoute>
          } />
          <Route path='/orders' element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path='/portfolio' element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          } />
      </Routes>
      
    
    </div>
      
  )
}

export default App
