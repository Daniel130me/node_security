import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')

  const login = async () => {
    await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username || 'demo' }),
    })
    onLogin()
  }

  return (
    <div>
      <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={login} style={{ marginLeft: 8 }}>Login</button>
    </div>
  )
}
