import Login from '../components/Login'

export default function LoginPage({ onLogin }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <Login onLogin={onLogin} />
    </div>
  )
}
