import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import PostsPage from './pages/PostsPage'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function App() {
  const [csrfToken, setCsrfToken] = useState('')
  const [refreshSignal, setRefreshSignal] = useState(0)

  const getCsrfToken = async () => {
    const res = await fetch(`${API_BASE}/csrf-token`, { credentials: 'include' })
    const data = await res.json()
    setCsrfToken(data.csrfToken)
    return data.csrfToken
  }

  const handleLogin = async () => {
    await getCsrfToken()
    setRefreshSignal((s) => s + 1)
  }

  const handleCreated = () => setRefreshSignal((s) => s + 1)

  return (
    <BrowserRouter>
      <div style={{ padding: 12, fontFamily: 'Arial, sans-serif' }}>
        <nav style={{ marginBottom: 12 }}>
          <Link to="/" style={{ marginRight: 8 }}>Home</Link>
          <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
          <Link to="/posts">Posts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/posts" element={<PostsPage csrfToken={csrfToken} refreshSignal={refreshSignal} onCreated={handleCreated} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}