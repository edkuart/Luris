import type { Request, Response, NextFunction } from 'express'
import { verifySession, type SessionUser } from '../auth/session'

declare global {
  namespace Express {
    interface Request {
      sessionUser: SessionUser
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const user = await verifySession(auth.slice(7))
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  req.sessionUser = user
  next()
}
