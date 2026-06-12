import { randomBytes, scryptSync } from 'node:crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const demoPassword = process.env.DEMO_USER_PASSWORD ?? 'LurisDemo2026!'
const demoEmail = (process.env.DEMO_USER_EMAIL ?? 'edkuart@gmail.com').toLowerCase()

function hashPassword(password) {
  const salt = randomBytes(16).toString('base64url')
  const key = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 }).toString('base64url')
  return `scrypt$16384$8$1$${salt}$${key}`
}

async function upsertClient(organizationId, data) {
  const existing = await prisma.client.findFirst({
    where: {
      organizationId,
      OR: [{ nit: data.nit }, { name: data.name }],
    },
  })

  if (existing) {
    return prisma.client.update({ where: { id: existing.id }, data })
  }

  return prisma.client.create({ data: { ...data, organizationId } })
}

async function upsertCaseFile(organizationId, data) {
  const existing = await prisma.caseFile.findFirst({
    where: { organizationId, caseNumber: data.caseNumber },
  })

  if (existing) {
    return prisma.caseFile.update({ where: { id: existing.id }, data })
  }

  return prisma.caseFile.create({ data: { ...data, organizationId } })
}

async function upsertTask(organizationId, data) {
  const existing = await prisma.task.findFirst({
    where: { organizationId, title: data.title, caseFileId: data.caseFileId },
  })

  if (existing) {
    return prisma.task.update({ where: { id: existing.id }, data })
  }

  return prisma.task.create({ data: { ...data, organizationId } })
}

async function upsertCalendarEvent(organizationId, data) {
  const existing = await prisma.calendarEvent.findFirst({
    where: { organizationId, title: data.title, caseFileId: data.caseFileId },
  })

  if (existing) {
    return prisma.calendarEvent.update({ where: { id: existing.id }, data })
  }

  return prisma.calendarEvent.create({ data: { ...data, organizationId } })
}

async function upsertDocument(organizationId, data) {
  const existing = await prisma.document.findFirst({
    where: { organizationId, name: data.name, caseFileId: data.caseFileId },
  })

  if (existing) {
    return prisma.document.update({ where: { id: existing.id }, data })
  }

  return prisma.document.create({ data: { ...data, organizationId } })
}

async function main() {
  let organization = await prisma.organization.findFirst({
    where: { name: 'Mayora & Asociados' },
  })

  organization ??= await prisma.organization.create({
    data: {
      name: 'Mayora & Asociados',
      legalName: 'Mayora & Asociados, Abogados y Notarios',
      nit: '10888976-4',
      subscriptionStatus: 'TRIAL',
      plan: 'Profesional',
      status: 'ACTIVE',
    },
  })

  const principal = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {
      name: 'Lic. Eduardo Duarte',
      passwordHash: hashPassword(demoPassword),
      role: 'LICENCIADO_PRINCIPAL',
      status: 'ACTIVE',
      organizationId: organization.id,
    },
    create: {
      name: 'Lic. Eduardo Duarte',
      email: demoEmail,
      passwordHash: hashPassword(demoPassword),
      role: 'LICENCIADO_PRINCIPAL',
      status: 'ACTIVE',
      organizationId: organization.id,
    },
  })

  await prisma.organization.update({
    where: { id: organization.id },
    data: { ownerUserId: principal.id },
  })

  const secretarySenior = await prisma.user.upsert({
    where: { email: 'secretaria@mayora.gt' },
    update: {
      name: 'Andrea Paola Mendez',
      passwordHash: hashPassword('SecretariaDemo2026!'),
      role: 'SECRETARIA_SENIOR',
      status: 'ACTIVE',
      organizationId: organization.id,
    },
    create: {
      name: 'Andrea Paola Mendez',
      email: 'secretaria@mayora.gt',
      passwordHash: hashPassword('SecretariaDemo2026!'),
      role: 'SECRETARIA_SENIOR',
      status: 'ACTIVE',
      organizationId: organization.id,
    },
  })

  const secretaryLimited = await prisma.user.upsert({
    where: { email: 'archivo@mayora.gt' },
    update: {
      name: 'Lucia Castillo',
      passwordHash: hashPassword('ArchivoDemo2026!'),
      role: 'SECRETARIA_LIMITADA',
      status: 'ACTIVE',
      organizationId: organization.id,
    },
    create: {
      name: 'Lucia Castillo',
      email: 'archivo@mayora.gt',
      passwordHash: hashPassword('ArchivoDemo2026!'),
      role: 'SECRETARIA_LIMITADA',
      status: 'ACTIVE',
      organizationId: organization.id,
    },
  })

  const clients = await Promise.all([
    upsertClient(organization.id, {
      name: 'Inversiones Las Verapaces, S.A.',
      dpi: null,
      nit: '9798412-6',
      email: 'legal@verapaces.gt',
      phone: '+502 2334 8871',
      address: '15 avenida 18-42, zona 10, Ciudad de Guatemala',
      notes: 'Cliente corporativo con procesos civiles y contractuales activos.',
    }),
    upsertClient(organization.id, {
      name: 'Maria Fernanda Lopez Herrera',
      dpi: '2458 96321 0101',
      nit: '1020304-5',
      email: 'mlopez@email.gt',
      phone: '+502 4210 7712',
      address: 'Residenciales San Isidro, zona 16',
      notes: 'Seguimiento de proceso familiar y medidas de proteccion.',
    }),
    upsertClient(organization.id, {
      name: 'Cafe Atitlan Export, S.A.',
      dpi: null,
      nit: '8452190-3',
      email: 'gerencia@cafeatitlan.gt',
      phone: '+502 7762 1190',
      address: 'Panajachel, Solola',
      notes: 'Expediente mercantil con revision de contratos de exportacion.',
    }),
    upsertClient(organization.id, {
      name: 'Carlos Antonio Mejia Barrios',
      dpi: '1987 65432 0101',
      nit: '889900-1',
      email: 'cmejia@email.gt',
      phone: '+502 5558 2030',
      address: '4 calle 7-22, zona 1, Quetzaltenango',
      notes: 'Proceso laboral asignado a abogado asociado.',
    }),
  ])

  const [verapaces, maria, cafe, carlos] = clients

  const caseFiles = await Promise.all([
    upsertCaseFile(organization.id, {
      clientId: verapaces.id,
      title: 'Cobro judicial por incumplimiento contractual',
      caseNumber: 'C01002-2026-00418',
      court: 'Juzgado Sexto de Primera Instancia Civil',
      type: 'Civil - Ejecutivo',
      status: 'ACTIVE',
      responsibleUserId: principal.id,
      description: 'Recuperacion de saldo por contrato de suministro firmado en Alta Verapaz.',
      importantDates: { next: '2026-06-14', label: 'Presentar liquidacion' },
    }),
    upsertCaseFile(organization.id, {
      clientId: maria.id,
      title: 'Fijacion de pension alimenticia',
      caseNumber: 'FAM-01190-2026-00077',
      court: 'Juzgado Segundo Pluripersonal de Familia',
      type: 'Familia - Alimentos',
      status: 'ACTIVE',
      responsibleUserId: principal.id,
      description: 'Preparacion de prueba documental y propuesta de convenio.',
      importantDates: { next: '2026-06-12', label: 'Audiencia de alimentos' },
    }),
    upsertCaseFile(organization.id, {
      clientId: carlos.id,
      title: 'Reinstalacion laboral y pago de prestaciones',
      caseNumber: 'LAB-01043-2026-00121',
      court: 'Juzgado Tercero de Trabajo y Prevision Social',
      type: 'Laboral',
      status: 'ACTIVE',
      responsibleUserId: principal.id,
      description: 'Audiencia de conciliacion y recepcion de prueba programada.',
      importantDates: { next: '2026-06-18', label: 'Conciliacion laboral' },
    }),
    upsertCaseFile(organization.id, {
      clientId: cafe.id,
      title: 'Revision de contrato de exportacion',
      caseNumber: 'MER-2026-00034',
      court: 'Asesoria mercantil interna',
      type: 'Mercantil - Contratos',
      status: 'ACTIVE',
      responsibleUserId: principal.id,
      description: 'Revision de clausulas de entrega, arbitraje y penalidades.',
      importantDates: { next: '2026-06-21', label: 'Revision contractual' },
    }),
  ])

  const [civilCase, familyCase, laborCase, merchantCase] = caseFiles

  await Promise.all([
    upsertTask(organization.id, {
      caseFileId: civilCase.id,
      assignedToId: secretarySenior.id,
      title: 'Preparar memorial de ampliacion de demanda',
      description: 'Adjuntar facturas certificadas y actualizar liquidacion.',
      status: 'PENDING',
      dueDate: new Date('2026-06-11T16:00:00-06:00'),
    }),
    upsertTask(organization.id, {
      caseFileId: familyCase.id,
      assignedToId: secretarySenior.id,
      title: 'Confirmar asistencia de testigo',
      description: 'Llamar y registrar disponibilidad para audiencia de familia.',
      status: 'IN_PROGRESS',
      dueDate: new Date('2026-06-12T09:30:00-06:00'),
    }),
    upsertTask(organization.id, {
      caseFileId: laborCase.id,
      assignedToId: secretaryLimited.id,
      title: 'Subir constancia laboral escaneada',
      description: 'Asociar el documento al expediente laboral y dejar version 1.',
      status: 'PENDING',
      dueDate: new Date('2026-06-13T17:00:00-06:00'),
    }),
    upsertTask(organization.id, {
      caseFileId: merchantCase.id,
      assignedToId: principal.id,
      title: 'Revisar clausula arbitral',
      description: 'Marcar comentarios para revision del Licenciado Principal.',
      status: 'DONE',
      dueDate: new Date('2026-06-10T17:00:00-06:00'),
    }),
  ])

  await Promise.all([
    upsertCalendarEvent(organization.id, {
      caseFileId: familyCase.id,
      title: 'Audiencia de pension alimenticia',
      description: 'Audiencia oral con propuesta de convenio.',
      location: 'Torre de Tribunales, nivel 8',
      startDate: new Date('2026-06-12T09:00:00-06:00'),
      endDate: new Date('2026-06-12T10:00:00-06:00'),
      type: 'AUDIENCIA',
    }),
    upsertCalendarEvent(organization.id, {
      caseFileId: civilCase.id,
      title: 'Vencimiento para presentar liquidacion',
      description: 'Presentacion electronica de liquidacion actualizada.',
      location: 'Portal electronico OJ',
      startDate: new Date('2026-06-14T15:30:00-06:00'),
      endDate: null,
      type: 'VENCIMIENTO',
    }),
    upsertCalendarEvent(organization.id, {
      caseFileId: laborCase.id,
      title: 'Conciliacion laboral',
      description: 'Audiencia de conciliacion y recepcion de prueba.',
      location: 'Centro Civico, zona 1',
      startDate: new Date('2026-06-18T11:00:00-06:00'),
      endDate: new Date('2026-06-18T12:00:00-06:00'),
      type: 'AUDIENCIA',
    }),
  ])

  await Promise.all([
    upsertDocument(organization.id, {
      caseFileId: civilCase.id,
      uploadedById: secretarySenior.id,
      name: 'Facturas certificadas lote mayo.pdf',
      fileUrl: 'mock://documents/facturas-certificadas-lote-mayo.pdf',
      fileType: 'PDF',
      size: 2400000,
      version: 1,
      status: 'ACTIVE',
    }),
    upsertDocument(organization.id, {
      caseFileId: familyCase.id,
      uploadedById: principal.id,
      name: 'Proyecto de convenio alimentos.docx',
      fileUrl: 'mock://documents/proyecto-convenio-alimentos.docx',
      fileType: 'DOCX',
      size: 184000,
      version: 3,
      status: 'ACTIVE',
    }),
    upsertDocument(organization.id, {
      caseFileId: laborCase.id,
      uploadedById: secretaryLimited.id,
      name: 'Constancia de relacion laboral.pdf',
      fileUrl: 'mock://documents/constancia-relacion-laboral.pdf',
      fileType: 'PDF',
      size: 980000,
      version: 1,
      status: 'ACTIVE',
    }),
  ])

  await prisma.auditLog.create({
    data: {
      organizationId: organization.id,
      userId: principal.id,
      action: 'seed.demo',
      entityType: 'Organization',
      entityId: organization.id,
      metadata: { email: demoEmail },
    },
  })

  console.log(`Seed complete. Demo login: ${demoEmail} / ${demoPassword}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
