import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

import authRoutes from './routes/authRoutes.js'
import postsRoutes from './routes/postsRoutes.js'
import { doubleCsrfProtection, generateCsrfToken } from './csrfConfig.js'
import rateLimit from 'express-rate-limit';
dotenv.config()
// DoS - Denial of  service
// DDos - Distributed Denial of Service
// CDN - Content Delivery Network
// Brute Force Attack
// API Abuse
// Mongodb Injection
// clickjacking
// mime sniffing
// MITM
const app = express()
app.use(express.json({ limit: '1kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser())
const limiter = rateLimit({
	message: {
		error: "Too many requests, please try again later."
	},
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: true, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
})



app.use(limiter)
// app.use(xss());
app.use(cors({ origin: true, credentials: true }))
app.set("trust proxy", 1); // this makes all ip look alike behind a proxy (e.g. heroku, vercel, cloudflare, nginx) so everyone gets the same rate limit rules applied

app.use('/auth', authRoutes)
const PORT = process.env.PORT || 4000
app.post("/test", xss(), async(req, res) => {
	res.json(req.body);
});
app.get('/helmet', (req, res) => {
	  res.send(res.getHeaders());
});
app.get('/csrf-token', limiter, (req, res) => {
	const token = generateCsrfToken(req, res)
	return res.json({ csrfToken: token })
})

app.use(doubleCsrfProtection) //validate the csrf token for all routes below

app.use('/posts', postsRoutes)

app.get('/', (req, res) => res.send('csrf demo'))

app.listen(PORT, () => console.log(`Backend listening on ${PORT}`))
