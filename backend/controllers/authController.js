import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret'

export function loginHandler(req, res) {
  const { username } = req.body
  if (!username) return res.status(400).json({ error: 'username required' })

  const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '1h' })
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  })
  return res.json({ ok: true })
}

export function logoutHandler(req, res) {
  res.clearCookie('token')
  res.json({ ok: true })
}
