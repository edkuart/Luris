import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const SCRYPT_N = 16384
const SCRYPT_R = 8
const SCRYPT_P = 1
const KEY_LENGTH = 64

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('base64url')
  const key = scryptSync(password, salt, KEY_LENGTH, { N: SCRYPT_N, r: SCRYPT_R, p: SCRYPT_P }).toString('base64url')
  return `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${salt}$${key}`
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split('$')
  const [algorithm, n, r, p, salt, key] = parts
  if (algorithm !== 'scrypt' || !salt || !key) return false

  const derived = scryptSync(password, salt, KEY_LENGTH, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  })
  const saved = Buffer.from(key, 'base64url')
  return saved.length === derived.length && timingSafeEqual(saved, derived)
}
