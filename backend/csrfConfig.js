import jwt from 'jsonwebtoken'
import { doubleCsrf } from 'csrf-csrf'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret'

export const csrf = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || 'dev-csrf-secret',
  getSessionIdentifier: (req) => {
    try {
      const token = req.cookies?.token
      if (!token) return 'no cookie'
      const payload = jwt.verify(token, JWT_SECRET)
      return payload.sub || payload.id || JSON.stringify(payload)
    } catch (err) {
      return 'something'
    }
  },
})

export const { doubleCsrfProtection, generateCsrfToken } = csrf
