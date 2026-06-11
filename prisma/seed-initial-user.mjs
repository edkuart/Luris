import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('base64url')
  const key = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 }).toString('base64url')
  return `scrypt$16384$8$1$${salt}$${key}`
}

export function verifyPassword(password, storedHash) {
  const [algorithm, n, r, p, salt, key] = storedHash.split('$')
  if (algorithm !== 'scrypt' || !salt || !key) return false

  const derived = scryptSync(password, salt, 64, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  })
  const saved = Buffer.from(key, 'base64url')
  return saved.length === derived.length && timingSafeEqual(saved, derived)
}

async function main() {
  const email = process.env.SEED_USER_EMAIL ?? 'edkuart@gmail.com'
  const password = requireEnv('SEED_USER_PASSWORD')
  const userName = process.env.SEED_USER_NAME ?? 'Edkuart'
  const organizationName = process.env.SEED_ORGANIZATION_NAME ?? 'Despacho Luris Guatemala'

  const organization =
    (await prisma.organization.findFirst({ where: { name: organizationName } })) ??
    (await prisma.organization.create({
      data: {
        name: organizationName,
        legalName: organizationName,
        subscriptionStatus: 'TRIAL',
        plan: 'Profesional',
        status: 'ACTIVE',
      },
    }))

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name: userName,
      passwordHash: hashPassword(password),
      role: 'LICENCIADO_PRINCIPAL',
      status: 'ACTIVE',
      organizationId: organization.id,
    },
    create: {
      name: userName,
      email,
      passwordHash: hashPassword(password),
      role: 'LICENCIADO_PRINCIPAL',
      status: 'ACTIVE',
      organizationId: organization.id,
    },
  })

  if (!organization.ownerUserId) {
    await prisma.organization.update({
      where: { id: organization.id },
      data: { ownerUserId: user.id },
    })
  }

  await prisma.auditLog.create({
    data: {
      organizationId: organization.id,
      userId: user.id,
      action: 'user.seed_initial',
      entityType: 'User',
      entityId: user.id,
      metadata: { email, role: 'LICENCIADO_PRINCIPAL' },
    },
  })

  console.log(`Initial user ready: ${email}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
