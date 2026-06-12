import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth'
import { clientsRouter } from './routes/clients'
import { healthRouter } from './routes/health'

const app = express()
const PORT = process.env.PORT ?? 3001

app.set('trust proxy', 1)

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3002',
    credentials: true,
  }),
)

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/clients', clientsRouter)
app.use('/api', healthRouter)

app.listen(PORT, () => {
  console.log(`Luris API running on port ${PORT}`)
})
