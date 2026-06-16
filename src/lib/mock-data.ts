import type { LucideIcon } from 'lucide-react'
import {
  BriefcaseBusiness,
  CalendarClock,
  FileArchive,
  Scale,
  ShieldCheck,
  SquareCheckBig,
  UserPlus,
  Users,
} from 'lucide-react'

export type ClientMock = {
  id: string
  name: string
  type: 'Persona individual' | 'Sociedad anonima' | 'Comerciante individual'
  dpi: string
  nit: string
  email: string
  phone: string
  address: string
  notes: string
  activeCases: number
  lastActivity: string
}

export type CaseFileMock = {
  id: string
  clientId: string
  clientName: string
  title: string
  caseNumber: string
  court: string
  type: string
  status: 'Activo' | 'En seguimiento' | 'Pendiente de audiencia'
  stage: 'Demanda' | 'Emplazamiento' | 'Prueba/Audiencias' | 'Sentencia' | 'Impugnacion'
  responsible: string
  description: string
  importantDate: string
  tasksOpen: number
  documentsCount: number
}

export type Pillar = 'Juicios' | 'Escrituras'

export type TaskMock = {
  id: string
  title: string
  description: string
  status: 'Pendiente' | 'En proceso' | 'Completada'
  priority: 'Alta' | 'Media' | 'Normal'
  dueDate: string
  assignedTo: string
  caseNumber: string
  pillar: Pillar
}

export type HearingMock = {
  id: string
  title: string
  type: 'Audiencia' | 'Vencimiento' | 'Reunion' | 'Presentacion de documento' | 'Recordatorio interno'
  date: string
  time: string
  court: string
  location: string
  caseNumber: string
  responsible: string
}

export type DocumentMock = {
  id: string
  name: string
  caseNumber: string
  caseTitle: string
  uploadedBy: string
  fileType: string
  size: string
  version: number
  uploadedAt: string
  status: 'Vigente' | 'En revision' | 'Borrador'
}

export type DocumentVersionMock = {
  id: string
  documentId: string
  version: number
  label: string
  author: string
  createdAt: string
  changeNote: string
  status: 'Borrador' | 'En revision' | 'Aprobada' | 'Presentada' | 'Archivada'
}

export type DocumentReviewMock = {
  id: string
  documentId: string
  title: string
  caseNumber: string
  clientName: string
  requestedBy: string
  reviewer: string
  dueAt: string
  priority: 'Alta' | 'Media' | 'Normal'
  status: 'Pendiente' | 'Observado' | 'Aprobado'
  nextAction: string
  checklist: Array<{ label: string; status: 'Completo' | 'Pendiente' | 'Revisar' }>
}

export type DocumentFolderMock = {
  id: string
  name: string
  caseNumber: string
  owner: string
  documents: number
  latestActivity: string
  health: 'Completa' | 'Revisar' | 'Incompleta'
}

export type DocumentDeliveryMock = {
  id: string
  documentName: string
  recipient: string
  method: 'Entrega fisica' | 'Correo seguro' | 'Presentacion electronica'
  status: 'Preparada' | 'Enviada' | 'Entregada' | 'Pendiente'
  dueAt: string
  proof: string
}

export type DocumentCommentMock = {
  id: string
  documentId: string
  author: string
  role: string
  createdAt: string
  comment: string
  status: 'Abierto' | 'Resuelto' | 'Informativo'
}

export type DocumentAuditEventMock = {
  id: string
  documentId: string
  time: string
  actor: string
  action: string
  detail: string
}

export type NotarialInstrumentMock = {
  id: string
  protocolNumber: string
  deedNumber: string
  type: 'Escritura publica' | 'Acta notarial' | 'Legalizacion de firma' | 'Testimonio'
  title: string
  clientName: string
  parties: string[]
  status: 'En preparacion' | 'Pendiente de firma' | 'Firmado' | 'Testimonio emitido' | 'Archivado'
  notary: string
  date: string
  nextStep: string
  folioRange: string
  comparecientes: Array<{ name: string; role: string; idDocument: string; nit: string }>
  checklist: Array<{ label: string; status: 'Completo' | 'Pendiente' | 'Revisar' }>
  documents: Array<{ name: string; status: 'Recibido' | 'Pendiente' | 'Borrador' | 'Emitido' }>
  timeline: Array<{ date: string; label: string; detail: string }>
}

export type NotarialWorkflowMock = {
  title: string
  owner: string
  status: string
  detail: string
  due: string
}

export type NotarialTemplateMock = {
  name: string
  category: string
  owner: string
  lastUpdated: string
  status: 'Activa' | 'Borrador' | 'Revision'
}

export type NotarialDocumentFlowItem = {
  id: string
  instrumentId: string
  name: string
  category: 'Identificacion' | 'Soporte legal' | 'Borrador' | 'Instrumento firmado' | 'Testimonio' | 'Entrega'
  status: 'Pendiente' | 'Recibido' | 'En revision' | 'Aprobado' | 'Emitido' | 'Entregado'
  owner: string
  updatedAt: string
  nextAction: string
}

export type NotarialAppointmentMock = {
  id: string
  instrumentId: string
  title: string
  clientName: string
  date: string
  time: string
  location: string
  type: 'Firma' | 'Revision previa' | 'Entrega' | 'Recepcion documental'
  status: 'Programada' | 'Preparacion pendiente' | 'Lista para firma' | 'Completada'
  responsible: string
  attendees: string[]
  preparation: Array<{ label: string; status: 'Listo' | 'Pendiente' | 'Revisar' }>
  closeout: string
}

export type NotarialPartyMock = {
  id: string
  name: string
  type: 'Persona individual' | 'Representante legal' | 'Sociedad' | 'Mandatario'
  dpi: string
  nit: string
  phone: string
  email: string
  address: string
  representation: string
  status: 'Completo' | 'Documento pendiente' | 'Revisar representacion'
  instruments: string[]
  documents: Array<{ name: string; status: 'Vigente' | 'Pendiente' | 'Vencido' | 'Revisar' }>
  alerts: string[]
}

export type NotarialGeneratorTemplateMock = {
  id: string
  name: string
  instrumentType: string
  description: string
  requiredFields: Array<{ label: string; value: string; status: 'Completo' | 'Pendiente' | 'Revisar' }>
  clauses: string[]
  preview: string
}

export type TeamWorkloadMock = {
  id: string
  name: string
  role: string
  activeCases: number
  openTasks: number
  overdueTasks: number
  notarialItems: number
  nextDeadline: string
  load: 'Normal' | 'Alta' | 'Critica'
}

export type ProductivityAlertMock = {
  title: string
  area: 'Judicial' | 'Notarial' | 'Documentos' | 'Equipo'
  severity: 'Alta' | 'Media' | 'Normal'
  detail: string
  owner: string
}

export type RiskDeadlineMock = {
  id: string
  title: string
  area: 'Judicial' | 'Notarial' | 'Documental' | 'Cliente'
  matter: string
  clientName: string
  dueDate: string
  dueTime: string
  daysLeft: number
  severity: 'Critico' | 'Alto' | 'Medio' | 'Controlado'
  status: 'Bloqueado' | 'En preparacion' | 'Listo' | 'Sin confirmar'
  owner: string
  backupOwner: string
  source: string
  blocker: string
  nextAction: string
  escalation: string
  checklist: Array<{ label: string; status: 'Listo' | 'Pendiente' | 'Bloqueado' | 'Revisar' }>
}

export type RiskWorkflowTemplateMock = {
  id: string
  title: string
  area: 'Judicial' | 'Notarial' | 'Documental'
  trigger: string
  owner: string
  steps: Array<{ label: string; owner: string; due: string; control: string }>
}

export type CaseTaskTemplateMock = {
  id: string
  title: string
  area: 'Civil' | 'Familia' | 'Laboral' | 'Mercantil' | 'Notarial' | 'Documental'
  caseType: string
  objective: string
  trigger: string
  recommendedOwner: string
  estimatedDuration: string
  riskLevel: 'Alto' | 'Medio' | 'Controlado'
  stages: Array<{
    title: string
    due: string
    responsible: string
    tasks: string[]
  }>
  generatedTasks: Array<{
    title: string
    ownerRole: string
    dueOffset: string
    priority: 'Alta' | 'Media' | 'Normal'
  }>
  requiredDocuments: string[]
  auditControls: string[]
  handoff: string
}

export type CaseCreationWizardMock = {
  selectedClientId: string
  selectedClientName: string
  selectedTemplateId: string
  draftCaseNumber: string
  courtOrArea: string
  responsible: string
  secretary: string
  openingReason: string
  intakeFields: Array<{ label: string; value: string; status: 'Completo' | 'Pendiente' | 'Revisar' }>
  generatedMilestones: Array<{ title: string; due: string; owner: string; source: string }>
  generatedRisks: Array<{ title: string; severity: 'Alto' | 'Medio' | 'Controlado'; owner: string; due: string }>
  documentBuckets: Array<{ title: string; documents: string[]; status: 'Listo' | 'Pendiente' | 'Revisar' }>
  reviewSteps: Array<{ title: string; owner: string; detail: string }>
}

export type PrincipalReviewItemMock = {
  id: string
  title: string
  source: 'Expediente' | 'Documento' | 'Riesgo' | 'Notarial' | 'Tarea critica'
  matter: string
  clientName: string
  requestedBy: string
  submittedAt: string
  dueAt: string
  priority: 'Alta' | 'Media' | 'Normal'
  status: 'Pendiente' | 'Observado' | 'Listo para aprobar'
  decision: 'Aprobar' | 'Solicitar cambios' | 'Reasignar' | 'Bloquear'
  reviewer: string
  summary: string
  blockers: string[]
  evidence: Array<{ label: string; status: 'Completo' | 'Pendiente' | 'Revisar' }>
  auditTrail: Array<{ time: string; actor: string; action: string }>
}

export type PrincipalReviewPolicyMock = {
  title: string
  appliesTo: string
  rule: string
  owner: string
}

export const firmProfile = {
  name: 'Mayora & Asociados',
  legalName: 'Mayora & Asociados, Abogados y Notarios',
  shortName: 'M&A',
  city: 'Ciudad de Guatemala',
  plan: 'Profesional',
  principal: 'Lic. Eduardo Duarte',
  principalInitials: 'ED',
  invitedSecretary: 'Andrea Paola Mendez',
  invitedSecretaryEmail: 'secretaria@mayora.gt',
  notary: 'Lic. Eduardo Duarte, Notario',
  notarialRegister: 'Colegiado activo · Protocolo 2026',
}

export const clients: ClientMock[] = [
  {
    id: 'cli-001',
    name: 'Inversiones Las Verapaces, S.A.',
    type: 'Sociedad anonima',
    dpi: '-',
    nit: '9798412-6',
    email: 'legal@verapaces.gt',
    phone: '+502 2334 8871',
    address: '15 avenida 18-42, zona 10, Ciudad de Guatemala',
    notes: 'Cliente corporativo con procesos civiles y contractuales activos.',
    activeCases: 3,
    lastActivity: 'Memorial revisado hoy',
  },
  {
    id: 'cli-002',
    name: 'Maria Fernanda Lopez Herrera',
    type: 'Persona individual',
    dpi: '2458 96321 0101',
    nit: '1020304-5',
    email: 'mlopez@email.gt',
    phone: '+502 4210 7712',
    address: 'Residenciales San Isidro, zona 16',
    notes: 'Seguimiento de proceso familiar y medidas de proteccion.',
    activeCases: 2,
    lastActivity: 'Cita confirmada para viernes',
  },
  {
    id: 'cli-003',
    name: 'Cafe Atitlan Export, S.A.',
    type: 'Sociedad anonima',
    dpi: '-',
    nit: '8452190-3',
    email: 'gerencia@cafeatitlan.gt',
    phone: '+502 7762 1190',
    address: 'Panajachel, Solola',
    notes: 'Expediente mercantil con revision de contratos de exportacion.',
    activeCases: 1,
    lastActivity: 'Contrato cargado por secretaria',
  },
  {
    id: 'cli-004',
    name: 'Carlos Antonio Mejia Barrios',
    type: 'Persona individual',
    dpi: '1987 65432 0101',
    nit: '889900-1',
    email: 'cmejia@email.gt',
    phone: '+502 5558 2030',
    address: '4 calle 7-22, zona 1, Quetzaltenango',
    notes: 'Proceso laboral asignado a abogado asociado.',
    activeCases: 1,
    lastActivity: 'Audiencia preparada',
  },
  {
    id: 'cli-005',
    name: 'Distribuidora El Progreso',
    type: 'Comerciante individual',
    dpi: '3021 44891 0201',
    nit: '613245-9',
    email: 'admin@elprogreso.gt',
    phone: '+502 7945 0021',
    address: 'Guastatoya, El Progreso',
    notes: 'Cobros y recuperacion de cartera comercial.',
    activeCases: 2,
    lastActivity: 'Mandamiento pendiente de revision',
  },
]

export const caseFiles: CaseFileMock[] = [
  {
    id: 'exp-001',
    clientId: 'cli-001',
    clientName: 'Inversiones Las Verapaces, S.A.',
    title: 'Cobro judicial por incumplimiento contractual',
    caseNumber: 'C01002-2026-00418',
    court: 'Juzgado Sexto de Primera Instancia Civil',
    type: 'Civil - Ejecutivo',
    status: 'Activo',
    stage: 'Sentencia',
    responsible: 'Lic. Eduardo Duarte',
    description: 'Recuperacion de saldo por contrato de suministro firmado en Alta Verapaz.',
    importantDate: '2026-06-14',
    tasksOpen: 4,
    documentsCount: 9,
  },
  {
    id: 'exp-002',
    clientId: 'cli-002',
    clientName: 'Maria Fernanda Lopez Herrera',
    title: 'Fijacion de pension alimenticia',
    caseNumber: 'FAM-01190-2026-00077',
    court: 'Juzgado Segundo Pluripersonal de Familia',
    type: 'Familia - Alimentos',
    status: 'Pendiente de audiencia',
    stage: 'Prueba/Audiencias',
    responsible: 'Licda. Sofia Cabrera',
    description: 'Preparacion de prueba documental y propuesta de convenio.',
    importantDate: '2026-06-12',
    tasksOpen: 3,
    documentsCount: 6,
  },
  {
    id: 'exp-003',
    clientId: 'cli-004',
    clientName: 'Carlos Antonio Mejia Barrios',
    title: 'Reinstalacion laboral y pago de prestaciones',
    caseNumber: 'LAB-01043-2026-00121',
    court: 'Juzgado Tercero de Trabajo y Prevision Social',
    type: 'Laboral',
    status: 'En seguimiento',
    stage: 'Emplazamiento',
    responsible: 'Lic. Mario Pineda',
    description: 'Audiencia de conciliacion y recepcion de prueba programada.',
    importantDate: '2026-06-18',
    tasksOpen: 2,
    documentsCount: 5,
  },
  {
    id: 'exp-004',
    clientId: 'cli-003',
    clientName: 'Cafe Atitlan Export, S.A.',
    title: 'Revision de contrato de exportacion',
    caseNumber: 'MER-2026-00034',
    court: 'Asesoria mercantil interna',
    type: 'Mercantil - Contratos',
    status: 'Activo',
    stage: 'Demanda',
    responsible: 'Lic. Eduardo Duarte',
    description: 'Revision de clausulas de entrega, arbitraje y penalidades.',
    importantDate: '2026-06-21',
    tasksOpen: 2,
    documentsCount: 4,
  },
]

export const tasks: TaskMock[] = [
  {
    id: 'tsk-001',
    title: 'Preparar memorial de ampliacion de demanda',
    description: 'Adjuntar facturas certificadas y actualizar liquidacion.',
    status: 'Pendiente',
    priority: 'Alta',
    dueDate: 'Hoy 16:00',
    assignedTo: 'Andrea Mendez',
    caseNumber: 'C01002-2026-00418',
    pillar: 'Juicios',
  },
  {
    id: 'tsk-002',
    title: 'Confirmar asistencia de testigo',
    description: 'Llamar y registrar disponibilidad para audiencia de familia.',
    status: 'En proceso',
    priority: 'Media',
    dueDate: 'Manana 09:30',
    assignedTo: 'Sofia Cabrera',
    caseNumber: 'FAM-01190-2026-00077',
    pillar: 'Juicios',
  },
  {
    id: 'tsk-003',
    title: 'Subir constancia laboral escaneada',
    description: 'Asociar el documento al expediente laboral y dejar version 1.',
    status: 'Pendiente',
    priority: 'Normal',
    dueDate: '2026-06-13',
    assignedTo: 'Andrea Mendez',
    caseNumber: 'LAB-01043-2026-00121',
    pillar: 'Juicios',
  },
  {
    id: 'tsk-004',
    title: 'Revisar clausula arbitral',
    description: 'Marcar comentarios para revision del Licenciado Principal.',
    status: 'Completada',
    priority: 'Normal',
    dueDate: 'Ayer',
    assignedTo: 'Mario Pineda',
    caseNumber: 'MER-2026-00034',
    pillar: 'Juicios',
  },
  {
    id: 'tsk-005',
    title: 'Solicitar certificacion registral del inmueble',
    description: 'Gestionar certificacion vigente para la compraventa antes de la firma.',
    status: 'Pendiente',
    priority: 'Alta',
    dueDate: 'Hoy 14:00',
    assignedTo: 'Andrea Mendez',
    caseNumber: 'PROTO-2026-001',
    pillar: 'Escrituras',
  },
  {
    id: 'tsk-006',
    title: 'Preparar testimonio especial para el AGP',
    description: 'Emitir testimonio especial dentro del plazo de 25 dias habiles tras la firma.',
    status: 'En proceso',
    priority: 'Media',
    dueDate: 'Manana 11:00',
    assignedTo: 'Lucia Castillo',
    caseNumber: 'ACTA-2026-014',
    pillar: 'Escrituras',
  },
]

export const hearings: HearingMock[] = [
  {
    id: 'aud-001',
    title: 'Audiencia de pension alimenticia',
    type: 'Audiencia',
    date: '2026-06-12',
    time: '09:00',
    court: 'Juzgado Segundo Pluripersonal de Familia',
    location: 'Torre de Tribunales, nivel 8',
    caseNumber: 'FAM-01190-2026-00077',
    responsible: 'Licda. Sofia Cabrera',
  },
  {
    id: 'aud-002',
    title: 'Vencimiento para presentar liquidacion',
    type: 'Vencimiento',
    date: '2026-06-14',
    time: '15:30',
    court: 'Juzgado Sexto de Primera Instancia Civil',
    location: 'Presentacion electronica',
    caseNumber: 'C01002-2026-00418',
    responsible: 'Andrea Mendez',
  },
  {
    id: 'aud-003',
    title: 'Conciliacion laboral',
    type: 'Audiencia',
    date: '2026-06-18',
    time: '11:00',
    court: 'Juzgado Tercero de Trabajo y Prevision Social',
    location: 'Centro Civico, zona 1',
    caseNumber: 'LAB-01043-2026-00121',
    responsible: 'Lic. Mario Pineda',
  },
  {
    id: 'aud-004',
    title: 'Reunion de revision contractual',
    type: 'Reunion',
    date: '2026-06-21',
    time: '08:30',
    court: 'Sala de juntas del despacho',
    location: 'Oficina zona 10',
    caseNumber: 'MER-2026-00034',
    responsible: 'Lic. Eduardo Duarte',
  },
]

export const documents: DocumentMock[] = [
  {
    id: 'doc-001',
    name: 'Facturas certificadas lote mayo.pdf',
    caseNumber: 'C01002-2026-00418',
    caseTitle: 'Cobro judicial por incumplimiento contractual',
    uploadedBy: 'Andrea Mendez',
    fileType: 'PDF',
    size: '2.4 MB',
    version: 1,
    uploadedAt: 'Hoy 10:18',
    status: 'Vigente',
  },
  {
    id: 'doc-002',
    name: 'Proyecto de convenio alimentos.docx',
    caseNumber: 'FAM-01190-2026-00077',
    caseTitle: 'Fijacion de pension alimenticia',
    uploadedBy: 'Sofia Cabrera',
    fileType: 'DOCX',
    size: '184 KB',
    version: 3,
    uploadedAt: 'Ayer 17:42',
    status: 'En revision',
  },
  {
    id: 'doc-003',
    name: 'Constancia de relacion laboral.pdf',
    caseNumber: 'LAB-01043-2026-00121',
    caseTitle: 'Reinstalacion laboral y pago de prestaciones',
    uploadedBy: 'Andrea Mendez',
    fileType: 'PDF',
    size: '980 KB',
    version: 1,
    uploadedAt: '2026-06-10',
    status: 'Vigente',
  },
  {
    id: 'doc-004',
    name: 'Contrato exportacion cafe borrador.docx',
    caseNumber: 'MER-2026-00034',
    caseTitle: 'Revision de contrato de exportacion',
    uploadedBy: 'Mario Pineda',
    fileType: 'DOCX',
    size: '266 KB',
    version: 2,
    uploadedAt: '2026-06-09',
    status: 'Borrador',
  },
]

export const documentVersions: DocumentVersionMock[] = [
  {
    id: 'dver-001',
    documentId: 'doc-001',
    version: 1,
    label: 'Carga inicial',
    author: 'Andrea Mendez',
    createdAt: 'Hoy 10:18',
    changeNote: 'Facturas certificadas del lote mayo cargadas como soporte del cobro.',
    status: 'Aprobada',
  },
  {
    id: 'dver-002',
    documentId: 'doc-002',
    version: 1,
    label: 'Borrador inicial',
    author: 'Licda. Sofia Cabrera',
    createdAt: '2026-06-09 15:20',
    changeNote: 'Primera version del convenio con obligaciones de pago.',
    status: 'Archivada',
  },
  {
    id: 'dver-003',
    documentId: 'doc-002',
    version: 2,
    label: 'Comentarios de cliente',
    author: 'Licda. Sofia Cabrera',
    createdAt: '2026-06-10 11:05',
    changeNote: 'Se ajusto monto mensual y fecha de deposito.',
    status: 'Archivada',
  },
  {
    id: 'dver-004',
    documentId: 'doc-002',
    version: 3,
    label: 'Revision final',
    author: 'Licda. Sofia Cabrera',
    createdAt: 'Ayer 17:42',
    changeNote: 'Lista para revision del Licenciado Principal antes de audiencia.',
    status: 'En revision',
  },
  {
    id: 'dver-005',
    documentId: 'doc-003',
    version: 1,
    label: 'Escaneo inicial',
    author: 'Andrea Mendez',
    createdAt: '2026-06-10',
    changeNote: 'Constancia laboral cargada para audiencia de conciliacion.',
    status: 'Aprobada',
  },
  {
    id: 'dver-006',
    documentId: 'doc-004',
    version: 1,
    label: 'Borrador mercantil',
    author: 'Mario Pineda',
    createdAt: '2026-06-08 16:10',
    changeNote: 'Primera version de contrato de exportacion.',
    status: 'Archivada',
  },
  {
    id: 'dver-007',
    documentId: 'doc-004',
    version: 2,
    label: 'Ajuste arbitral',
    author: 'Mario Pineda',
    createdAt: '2026-06-09',
    changeNote: 'Se incorporo clausula arbitral y penalidades por incumplimiento.',
    status: 'Borrador',
  },
]

export const documentReviewQueue: DocumentReviewMock[] = [
  {
    id: 'drev-001',
    documentId: 'doc-002',
    title: 'Convenio de pension alimenticia v3',
    caseNumber: 'FAM-01190-2026-00077',
    clientName: 'Maria Fernanda Lopez Herrera',
    requestedBy: 'Licda. Sofia Cabrera',
    reviewer: firmProfile.principal,
    dueAt: 'Hoy 15:00',
    priority: 'Alta',
    status: 'Pendiente',
    nextAction: 'Revisar clausulas de pago y dejar listo para audiencia.',
    checklist: [
      { label: 'Version vigente identificada', status: 'Completo' },
      { label: 'Datos de partes verificados', status: 'Completo' },
      { label: 'Monto y forma de pago', status: 'Revisar' },
      { label: 'Enviar a bandeja principal', status: 'Pendiente' },
    ],
  },
  {
    id: 'drev-002',
    documentId: 'doc-004',
    title: 'Contrato de exportacion con clausula arbitral',
    caseNumber: 'MER-2026-00034',
    clientName: 'Cafe Atitlan Export, S.A.',
    requestedBy: 'Mario Pineda',
    reviewer: firmProfile.principal,
    dueAt: '2026-06-12 12:00',
    priority: 'Media',
    status: 'Observado',
    nextAction: 'Ajustar penalidades y confirmar jurisdiccion aplicable.',
    checklist: [
      { label: 'Version editable cargada', status: 'Completo' },
      { label: 'Comentarios de cliente', status: 'Completo' },
      { label: 'Clausula arbitral', status: 'Revisar' },
      { label: 'Version final PDF', status: 'Pendiente' },
    ],
  },
  {
    id: 'drev-003',
    documentId: 'doc-001',
    title: 'Facturas certificadas para liquidacion',
    caseNumber: 'C01002-2026-00418',
    clientName: 'Inversiones Las Verapaces, S.A.',
    requestedBy: 'Andrea Mendez',
    reviewer: firmProfile.principal,
    dueAt: 'Hoy 17:00',
    priority: 'Alta',
    status: 'Aprobado',
    nextAction: 'Usar como soporte del memorial de liquidacion.',
    checklist: [
      { label: 'Legibilidad validada', status: 'Completo' },
      { label: 'Relacion con liquidacion', status: 'Completo' },
      { label: 'Version aprobada', status: 'Completo' },
    ],
  },
]

export const documentFolders: DocumentFolderMock[] = [
  {
    id: 'dfol-001',
    name: 'Demanda y soporte de cobro',
    caseNumber: 'C01002-2026-00418',
    owner: 'Andrea Mendez',
    documents: 9,
    latestActivity: 'Facturas certificadas aprobadas hoy',
    health: 'Revisar',
  },
  {
    id: 'dfol-002',
    name: 'Audiencia de alimentos',
    caseNumber: 'FAM-01190-2026-00077',
    owner: 'Licda. Sofia Cabrera',
    documents: 6,
    latestActivity: 'Convenio v3 en revision',
    health: 'Incompleta',
  },
  {
    id: 'dfol-003',
    name: 'Conciliacion laboral',
    caseNumber: 'LAB-01043-2026-00121',
    owner: 'Lic. Mario Pineda',
    documents: 5,
    latestActivity: 'Constancia laboral cargada',
    health: 'Completa',
  },
  {
    id: 'dfol-004',
    name: 'Contrato de exportacion',
    caseNumber: 'MER-2026-00034',
    owner: 'Lic. Mario Pineda',
    documents: 4,
    latestActivity: 'Clausula arbitral observada',
    health: 'Revisar',
  },
]

export const documentDeliveries: DocumentDeliveryMock[] = [
  {
    id: 'del-001',
    documentName: 'Memorial de liquidacion civil',
    recipient: 'Juzgado Sexto de Primera Instancia Civil',
    method: 'Presentacion electronica',
    status: 'Preparada',
    dueAt: '2026-06-14 15:30',
    proof: 'Cargo electronico requerido al presentar.',
  },
  {
    id: 'del-002',
    documentName: 'Convenio de pension alimenticia',
    recipient: 'Cliente y juzgado de familia',
    method: 'Entrega fisica',
    status: 'Pendiente',
    dueAt: '2026-06-12 09:00',
    proof: 'Acta de audiencia o constancia de entrega.',
  },
  {
    id: 'del-003',
    documentName: 'Carta poder legalizada',
    recipient: 'Cafe Atitlan Export, S.A.',
    method: 'Entrega fisica',
    status: 'Entregada',
    dueAt: 'Hoy 16:30',
    proof: 'Constancia de entrega firmada.',
  },
]

export const documentComments: DocumentCommentMock[] = [
  {
    id: 'dcom-001',
    documentId: 'doc-002',
    author: 'Lic. Eduardo Duarte',
    role: 'Licenciado Principal',
    createdAt: 'Hoy 12:25',
    comment: 'Revisar que el monto mensual coincida con la propuesta discutida con cliente antes de audiencia.',
    status: 'Abierto',
  },
  {
    id: 'dcom-002',
    documentId: 'doc-002',
    author: 'Licda. Sofia Cabrera',
    role: 'Abogada Asociada',
    createdAt: 'Hoy 13:10',
    comment: 'Se ajusto la fecha de deposito y queda pendiente validacion del monto final.',
    status: 'Informativo',
  },
  {
    id: 'dcom-003',
    documentId: 'doc-004',
    author: 'Lic. Eduardo Duarte',
    role: 'Licenciado Principal',
    createdAt: 'Ayer 18:05',
    comment: 'La clausula arbitral debe dejar clara la sede y reglas aplicables.',
    status: 'Abierto',
  },
  {
    id: 'dcom-004',
    documentId: 'doc-001',
    author: 'Andrea Mendez',
    role: 'Secretaria Senior',
    createdAt: 'Hoy 10:40',
    comment: 'Facturas revisadas contra listado de soporte. Legibilidad completa.',
    status: 'Resuelto',
  },
]

export const documentAuditEvents: DocumentAuditEventMock[] = [
  {
    id: 'daud-001',
    documentId: 'doc-002',
    time: '2026-06-09 15:20',
    actor: 'Licda. Sofia Cabrera',
    action: 'Creo version 1',
    detail: 'Borrador inicial del convenio de pension alimenticia.',
  },
  {
    id: 'daud-002',
    documentId: 'doc-002',
    time: '2026-06-10 11:05',
    actor: 'Licda. Sofia Cabrera',
    action: 'Creo version 2',
    detail: 'Incorporo comentarios del cliente.',
  },
  {
    id: 'daud-003',
    documentId: 'doc-002',
    time: 'Ayer 17:42',
    actor: 'Licda. Sofia Cabrera',
    action: 'Envio a revision',
    detail: 'Version 3 marcada para revision del Licenciado Principal.',
  },
  {
    id: 'daud-004',
    documentId: 'doc-002',
    time: 'Hoy 12:25',
    actor: 'Lic. Eduardo Duarte',
    action: 'Agrego observacion',
    detail: 'Solicito validar monto mensual antes de audiencia.',
  },
  {
    id: 'daud-005',
    documentId: 'doc-001',
    time: 'Hoy 10:18',
    actor: 'Andrea Mendez',
    action: 'Cargo documento',
    detail: 'Facturas certificadas asociadas al expediente civil.',
  },
  {
    id: 'daud-006',
    documentId: 'doc-001',
    time: 'Hoy 10:40',
    actor: 'Lic. Eduardo Duarte',
    action: 'Aprobo version',
    detail: 'Documento apto como soporte de liquidacion.',
  },
  {
    id: 'daud-007',
    documentId: 'doc-004',
    time: '2026-06-09',
    actor: 'Mario Pineda',
    action: 'Creo version 2',
    detail: 'Ajuste de clausula arbitral y penalidades.',
  },
  {
    id: 'daud-008',
    documentId: 'doc-004',
    time: 'Ayer 18:05',
    actor: 'Lic. Eduardo Duarte',
    action: 'Observo documento',
    detail: 'Pide precisar sede arbitral y reglas aplicables.',
  },
]

export const documentGovernanceRules = [
  'La version vigente debe ser visible sin abrir el expediente.',
  'Todo documento para presentar requiere revision, evidencia y responsable.',
  'No se elimina fisicamente: se archiva o se marca baja logica con auditoria.',
  'Las entregas deben conservar constancia, destinatario, metodo y hora.',
]

export const notarialInstruments: NotarialInstrumentMock[] = [
  {
    id: 'not-001',
    protocolNumber: 'PROTO-2026-001',
    deedNumber: 'Escritura 18',
    type: 'Escritura publica',
    title: 'Compraventa de inmueble urbano',
    clientName: 'Maria Fernanda Lopez Herrera',
    parties: ['Maria Fernanda Lopez Herrera', 'Inmobiliaria Santa Clara, S.A.'],
    status: 'Pendiente de firma',
    notary: firmProfile.notary,
    date: '2026-06-13',
    nextStep: 'Verificar DPI original, NIT y solvencia municipal antes de firma.',
    folioRange: 'Folios 42-48',
    comparecientes: [
      { name: 'Maria Fernanda Lopez Herrera', role: 'Compradora', idDocument: 'DPI 2458 96321 0101', nit: '1020304-5' },
      { name: 'Inmobiliaria Santa Clara, S.A.', role: 'Vendedora', idDocument: 'Representante legal acreditado', nit: '5519201-8' },
    ],
    checklist: [
      { label: 'DPI y NIT de comparecientes', status: 'Completo' },
      { label: 'Certificacion registral reciente', status: 'Pendiente' },
      { label: 'Solvencia municipal/IUSI', status: 'Revisar' },
      { label: 'Minuta aprobada por partes', status: 'Completo' },
    ],
    documents: [
      { name: 'Borrador compraventa inmueble.docx', status: 'Borrador' },
      { name: 'DPI compradora.pdf', status: 'Recibido' },
      { name: 'Certificacion registral.pdf', status: 'Pendiente' },
    ],
    timeline: [
      { date: '2026-06-10', label: 'Solicitud ingresada', detail: 'Secretaria registro cliente y datos del inmueble.' },
      { date: '2026-06-11', label: 'Borrador preparado', detail: 'Notario genero primera version de escritura.' },
      { date: '2026-06-13', label: 'Firma programada', detail: 'Comparecientes citados en oficina zona 10.' },
    ],
  },
  {
    id: 'not-002',
    protocolNumber: 'PROTO-2026-002',
    deedNumber: 'Escritura 19',
    type: 'Escritura publica',
    title: 'Mandato general con representacion',
    clientName: 'Inversiones Las Verapaces, S.A.',
    parties: ['Representante legal', 'Mandatario designado'],
    status: 'En preparacion',
    notary: firmProfile.notary,
    date: '2026-06-14',
    nextStep: 'Adjuntar nombramiento vigente y acta de autorizacion.',
    folioRange: 'Folios 49-53',
    comparecientes: [
      { name: 'Representante legal', role: 'Mandante', idDocument: 'Nombramiento vigente', nit: '9798412-6' },
      { name: 'Mandatario designado', role: 'Mandatario', idDocument: 'DPI pendiente', nit: 'Pendiente' },
    ],
    checklist: [
      { label: 'Nombramiento vigente', status: 'Pendiente' },
      { label: 'Acta de autorizacion', status: 'Pendiente' },
      { label: 'Datos completos de mandatario', status: 'Revisar' },
    ],
    documents: [
      { name: 'Minuta mandato general.docx', status: 'Borrador' },
      { name: 'Nombramiento representante.pdf', status: 'Pendiente' },
    ],
    timeline: [
      { date: '2026-06-11', label: 'Solicitud corporativa', detail: 'Cliente pidio preparar mandato general.' },
      { date: '2026-06-12', label: 'Revision pendiente', detail: 'Falta nombramiento y autorizacion interna.' },
    ],
  },
  {
    id: 'not-003',
    protocolNumber: 'ACTA-2026-014',
    deedNumber: 'Acta 14',
    type: 'Acta notarial',
    title: 'Acta de declaracion jurada',
    clientName: 'Carlos Antonio Mejia Barrios',
    parties: ['Carlos Antonio Mejia Barrios'],
    status: 'Firmado',
    notary: firmProfile.notary,
    date: '2026-06-10',
    nextStep: 'Emitir copia simple y archivar documentos de soporte.',
    folioRange: 'Acta fuera de protocolo',
    comparecientes: [
      { name: 'Carlos Antonio Mejia Barrios', role: 'Declarante', idDocument: 'DPI 1987 65432 0101', nit: '889900-1' },
    ],
    checklist: [
      { label: 'Identificacion del declarante', status: 'Completo' },
      { label: 'Declaracion revisada', status: 'Completo' },
      { label: 'Archivo de soporte', status: 'Pendiente' },
    ],
    documents: [
      { name: 'Acta declaracion jurada.pdf', status: 'Emitido' },
      { name: 'DPI declarante.pdf', status: 'Recibido' },
    ],
    timeline: [
      { date: '2026-06-10', label: 'Acta firmada', detail: 'Declarante comparecio y firmo ante notario.' },
      { date: '2026-06-10', label: 'Copia simple pendiente', detail: 'Secretaria debe preparar entrega.' },
    ],
  },
  {
    id: 'not-004',
    protocolNumber: 'LEG-2026-041',
    deedNumber: 'Legalizacion 41',
    type: 'Legalizacion de firma',
    title: 'Legalizacion de firma en carta poder',
    clientName: 'Cafe Atitlan Export, S.A.',
    parties: ['Gerente general', 'Auxiliar notarial'],
    status: 'Testimonio emitido',
    notary: firmProfile.notary,
    date: '2026-06-09',
    nextStep: 'Entregar testimonio y registrar retiro por cliente.',
    folioRange: 'Legalizacion 41',
    comparecientes: [
      { name: 'Gerente general', role: 'Firmante', idDocument: 'DPI verificado', nit: '8452190-3' },
      { name: 'Auxiliar notarial', role: 'Receptor', idDocument: 'Interno', nit: '-' },
    ],
    checklist: [
      { label: 'Firma comparada con DPI', status: 'Completo' },
      { label: 'Carta poder original', status: 'Completo' },
      { label: 'Constancia de entrega', status: 'Pendiente' },
    ],
    documents: [
      { name: 'Carta poder legalizada.pdf', status: 'Emitido' },
      { name: 'Constancia de entrega.pdf', status: 'Pendiente' },
    ],
    timeline: [
      { date: '2026-06-09', label: 'Firma legalizada', detail: 'Notario autorizo legalizacion de firma.' },
      { date: '2026-06-09', label: 'Entrega pendiente', detail: 'Cliente debe firmar constancia de retiro.' },
    ],
  },
]

export const notarialWorkflow: NotarialWorkflowMock[] = [
  {
    title: 'Ingreso de solicitud notarial',
    owner: 'Secretaria Senior',
    status: 'Entrada',
    detail: 'Registrar cliente, tipo de instrumento, comparecientes y documentos requeridos.',
    due: 'Mismo dia',
  },
  {
    title: 'Revision documental',
    owner: 'Auxiliar notarial',
    status: 'Control',
    detail: 'Validar DPI, NIT, representacion legal, certificaciones y poderes.',
    due: 'Antes de redactar',
  },
  {
    title: 'Redaccion de instrumento',
    owner: 'Notario',
    status: 'Produccion',
    detail: 'Preparar escritura, acta o legalizacion con correlativo interno.',
    due: '24-48 horas',
  },
  {
    title: 'Firma y autorizacion',
    owner: 'Notario',
    status: 'Firma',
    detail: 'Confirmar presencia de comparecientes y registrar cierre del acto.',
    due: 'Cita programada',
  },
  {
    title: 'Testimonio, indice y archivo',
    owner: 'Secretaria Senior',
    status: 'Cierre',
    detail: 'Emitir testimonio, actualizar indice notarial y archivar soporte.',
    due: 'Posterior a firma',
  },
]

export const notarialDocumentTypes = [
  'Minuta o instrucciones del cliente',
  'DPI y NIT de comparecientes',
  'Nombramiento o representacion legal',
  'Certificacion registral',
  'Borrador de escritura o acta',
  'Testimonio emitido',
  'Constancia de entrega',
]

export const notarialIndexEntries = [
  { number: '18', date: '2026-06-13', act: 'Compraventa', grantors: 'Lopez Herrera / Inmobiliaria Santa Clara, S.A.', status: 'Pendiente de firma' },
  { number: '19', date: '2026-06-14', act: 'Mandato general', grantors: 'Inversiones Las Verapaces, S.A.', status: 'En preparacion' },
  { number: '14', date: '2026-06-10', act: 'Declaracion jurada', grantors: 'Carlos Antonio Mejia Barrios', status: 'Firmado' },
]

export const notarialCorrelatives = [
  { label: 'Escrituras publicas', current: '19', next: '20', prefix: 'ESC-2026', status: 'Activo' },
  { label: 'Actas notariales', current: '14', next: '15', prefix: 'ACTA-2026', status: 'Activo' },
  { label: 'Legalizaciones', current: '41', next: '42', prefix: 'LEG-2026', status: 'Activo' },
  { label: 'Testimonios', current: '8', next: '9', prefix: 'TEST-2026', status: 'Revision' },
]

export const notarialTemplates: NotarialTemplateMock[] = [
  { name: 'Compraventa de inmueble urbano', category: 'Escritura publica', owner: 'Notario', lastUpdated: '2026-06-08', status: 'Activa' },
  { name: 'Mandato general con representacion', category: 'Escritura publica', owner: 'Notario', lastUpdated: '2026-06-10', status: 'Revision' },
  { name: 'Acta de declaracion jurada', category: 'Acta notarial', owner: 'Auxiliar notarial', lastUpdated: '2026-06-03', status: 'Activa' },
  { name: 'Legalizacion de firma en carta poder', category: 'Legalizacion', owner: 'Secretaria Senior', lastUpdated: '2026-06-05', status: 'Borrador' },
]

export const notarialDocumentStages = [
  { label: 'Recibir documentos', detail: 'DPI, NIT, representacion, certificaciones y minuta inicial.' },
  { label: 'Revisar soporte', detail: 'Validar vigencia, legibilidad, datos de comparecientes y observaciones.' },
  { label: 'Generar borrador', detail: 'Preparar instrumento con plantilla y correlativo interno.' },
  { label: 'Autorizar y firmar', detail: 'Confirmar comparecientes, firma y cierre del acto notarial.' },
  { label: 'Emitir testimonio', detail: 'Generar testimonio/copia y registrar version emitida.' },
  { label: 'Registrar entrega', detail: 'Guardar constancia de retiro y archivar soporte.' },
]

export const notarialDocumentFlow: NotarialDocumentFlowItem[] = [
  {
    id: 'ndoc-001',
    instrumentId: 'not-001',
    name: 'DPI compradora.pdf',
    category: 'Identificacion',
    status: 'Recibido',
    owner: 'Andrea Mendez',
    updatedAt: 'Hoy 09:20',
    nextAction: 'Validar contra datos del instrumento.',
  },
  {
    id: 'ndoc-002',
    instrumentId: 'not-001',
    name: 'Certificacion registral inmueble.pdf',
    category: 'Soporte legal',
    status: 'Pendiente',
    owner: 'Secretaria Senior',
    updatedAt: 'Pendiente',
    nextAction: 'Solicitar documento vigente al cliente.',
  },
  {
    id: 'ndoc-003',
    instrumentId: 'not-001',
    name: 'Borrador compraventa inmueble.docx',
    category: 'Borrador',
    status: 'En revision',
    owner: 'Lic. Eduardo Duarte',
    updatedAt: 'Hoy 11:10',
    nextAction: 'Revisar clausulas de pago y entrega.',
  },
  {
    id: 'ndoc-004',
    instrumentId: 'not-002',
    name: 'Nombramiento representante legal.pdf',
    category: 'Soporte legal',
    status: 'Pendiente',
    owner: 'Andrea Mendez',
    updatedAt: 'Ayer 16:40',
    nextAction: 'Confirmar vigencia y facultades.',
  },
  {
    id: 'ndoc-005',
    instrumentId: 'not-003',
    name: 'Acta declaracion jurada firmada.pdf',
    category: 'Instrumento firmado',
    status: 'Aprobado',
    owner: 'Lucia Castillo',
    updatedAt: '2026-06-10',
    nextAction: 'Preparar copia simple y archivo.',
  },
  {
    id: 'ndoc-006',
    instrumentId: 'not-004',
    name: 'Constancia de entrega legalizacion.pdf',
    category: 'Entrega',
    status: 'Pendiente',
    owner: 'Secretaria Senior',
    updatedAt: 'Pendiente',
    nextAction: 'Registrar firma de retiro del cliente.',
  },
]

export const notarialDocumentActions = [
  'Marcar recibido',
  'Enviar a revision',
  'Aprobar soporte',
  'Generar borrador desde plantilla',
  'Emitir testimonio',
  'Registrar entrega',
]

export const notarialAppointments: NotarialAppointmentMock[] = [
  {
    id: 'nap-001',
    instrumentId: 'not-001',
    title: 'Firma de compraventa de inmueble urbano',
    clientName: 'Maria Fernanda Lopez Herrera',
    date: '2026-06-13',
    time: '10:00',
    location: 'Sala de firmas · Oficina zona 10',
    type: 'Firma',
    status: 'Preparacion pendiente',
    responsible: 'Andrea Mendez',
    attendees: ['Compradora', 'Representante de vendedora', 'Notario'],
    preparation: [
      { label: 'Confirmar asistencia de comparecientes', status: 'Pendiente' },
      { label: 'Imprimir borrador final', status: 'Revisar' },
      { label: 'Preparar libro/protocolo y sellos', status: 'Listo' },
      { label: 'Verificar documentos originales', status: 'Pendiente' },
    ],
    closeout: 'Registrar firma, escanear instrumento firmado y programar emision de testimonio.',
  },
  {
    id: 'nap-002',
    instrumentId: 'not-002',
    title: 'Recepcion de documentos para mandato',
    clientName: 'Inversiones Las Verapaces, S.A.',
    date: '2026-06-12',
    time: '15:00',
    location: 'Recepcion del despacho',
    type: 'Recepcion documental',
    status: 'Programada',
    responsible: 'Lucia Castillo',
    attendees: ['Mensajero autorizado', 'Secretaria Senior'],
    preparation: [
      { label: 'Listado de documentos requeridos enviado', status: 'Listo' },
      { label: 'Nombramiento vigente', status: 'Pendiente' },
      { label: 'DPI del mandatario', status: 'Pendiente' },
    ],
    closeout: 'Marcar documentos recibidos y pasar a revision del Notario.',
  },
  {
    id: 'nap-003',
    instrumentId: 'not-004',
    title: 'Entrega de legalizacion de firma',
    clientName: 'Cafe Atitlan Export, S.A.',
    date: '2026-06-11',
    time: '16:30',
    location: 'Recepcion del despacho',
    type: 'Entrega',
    status: 'Lista para firma',
    responsible: 'Andrea Mendez',
    attendees: ['Gerente general', 'Auxiliar notarial'],
    preparation: [
      { label: 'Documento legalizado listo', status: 'Listo' },
      { label: 'Constancia de entrega preparada', status: 'Listo' },
      { label: 'DPI para retiro', status: 'Revisar' },
    ],
    closeout: 'Registrar entrega y archivar constancia firmada.',
  },
  {
    id: 'nap-004',
    instrumentId: 'not-003',
    title: 'Entrega de copia simple de acta',
    clientName: 'Carlos Antonio Mejia Barrios',
    date: '2026-06-10',
    time: '17:00',
    location: 'Recepcion del despacho',
    type: 'Entrega',
    status: 'Completada',
    responsible: 'Lucia Castillo',
    attendees: ['Cliente'],
    preparation: [
      { label: 'Copia simple emitida', status: 'Listo' },
      { label: 'Constancia de entrega firmada', status: 'Listo' },
    ],
    closeout: 'Archivo de soporte actualizado.',
  },
]

export const notarialAppointmentFlow = [
  { label: 'Recepcion', detail: 'Confirmar cita, identidad y documentos que debe traer el cliente.' },
  { label: 'Preparacion', detail: 'Revisar borrador, originales, sellos, protocolo y sala de firma.' },
  { label: 'Firma', detail: 'Validar comparecientes, leer instrumento y registrar autorizacion.' },
  { label: 'Entrega', detail: 'Emitir testimonio/copia, registrar retiro y archivar constancia.' },
  { label: 'Cierre', detail: 'Actualizar indice, timeline y auditoria del expediente notarial.' },
]

export const notarialParties: NotarialPartyMock[] = [
  {
    id: 'party-001',
    name: 'Maria Fernanda Lopez Herrera',
    type: 'Persona individual',
    dpi: '2458 96321 0101',
    nit: '1020304-5',
    phone: '+502 4210 7712',
    email: 'mlopez@email.gt',
    address: 'Residenciales San Isidro, zona 16',
    representation: 'Comparece en nombre propio',
    status: 'Documento pendiente',
    instruments: ['not-001'],
    documents: [
      { name: 'DPI frente y reverso', status: 'Vigente' },
      { name: 'NIT actualizado', status: 'Vigente' },
      { name: 'Solvencia municipal/IUSI', status: 'Pendiente' },
    ],
    alerts: ['Falta solvencia municipal para firma de compraventa.'],
  },
  {
    id: 'party-002',
    name: 'Inmobiliaria Santa Clara, S.A.',
    type: 'Sociedad',
    dpi: '-',
    nit: '5519201-8',
    phone: '+502 2331 4400',
    email: 'legal@santaclara.gt',
    address: 'Zona 14, Ciudad de Guatemala',
    representation: 'Representante legal pendiente de confirmar facultades',
    status: 'Revisar representacion',
    instruments: ['not-001'],
    documents: [
      { name: 'Nombramiento representante legal', status: 'Revisar' },
      { name: 'Patente de sociedad', status: 'Vigente' },
      { name: 'Acta de autorizacion de venta', status: 'Pendiente' },
    ],
    alerts: ['Revisar facultades del representante antes de autorizar escritura.'],
  },
  {
    id: 'party-003',
    name: 'Inversiones Las Verapaces, S.A.',
    type: 'Sociedad',
    dpi: '-',
    nit: '9798412-6',
    phone: '+502 2334 8871',
    email: 'legal@verapaces.gt',
    address: '15 avenida 18-42, zona 10',
    representation: 'Mandante en escritura de mandato general',
    status: 'Documento pendiente',
    instruments: ['not-002'],
    documents: [
      { name: 'Nombramiento vigente', status: 'Pendiente' },
      { name: 'Acta de autorizacion', status: 'Pendiente' },
      { name: 'Patente de comercio', status: 'Vigente' },
    ],
    alerts: ['Nombramiento y acta de autorizacion pendientes.'],
  },
  {
    id: 'party-004',
    name: 'Carlos Antonio Mejia Barrios',
    type: 'Persona individual',
    dpi: '1987 65432 0101',
    nit: '889900-1',
    phone: '+502 5558 2030',
    email: 'cmejia@email.gt',
    address: '4 calle 7-22, zona 1, Quetzaltenango',
    representation: 'Declarante en acta notarial',
    status: 'Completo',
    instruments: ['not-003'],
    documents: [
      { name: 'DPI frente y reverso', status: 'Vigente' },
      { name: 'Declaracion revisada', status: 'Vigente' },
    ],
    alerts: [],
  },
  {
    id: 'party-005',
    name: 'Gerente general de Cafe Atitlan Export, S.A.',
    type: 'Representante legal',
    dpi: '3020 88119 0701',
    nit: '8452190-3',
    phone: '+502 7762 1190',
    email: 'gerencia@cafeatitlan.gt',
    address: 'Panajachel, Solola',
    representation: 'Firmante de carta poder',
    status: 'Completo',
    instruments: ['not-004'],
    documents: [
      { name: 'DPI firmante', status: 'Vigente' },
      { name: 'Carta poder original', status: 'Vigente' },
      { name: 'Nombramiento', status: 'Vigente' },
    ],
    alerts: [],
  },
]

export const notarialPartyRequirements = [
  'DPI legible frente y reverso',
  'NIT o constancia RTU cuando aplique',
  'Documento que acredite representacion',
  'Facultades suficientes para el acto',
  'Datos de contacto y direccion actualizada',
  'Relacion clara con instrumento y rol de comparecencia',
]

export const notarialGeneratorTemplates: NotarialGeneratorTemplateMock[] = [
  {
    id: 'gen-001',
    name: 'Compraventa de inmueble urbano',
    instrumentType: 'Escritura publica',
    description: 'Plantilla base para compraventa con comparecientes, inmueble, precio, forma de pago y entrega.',
    requiredFields: [
      { label: 'Comprador', value: 'Maria Fernanda Lopez Herrera', status: 'Completo' },
      { label: 'Vendedor', value: 'Inmobiliaria Santa Clara, S.A.', status: 'Completo' },
      { label: 'Datos registrales del inmueble', value: 'Finca, folio y libro pendientes de confirmar', status: 'Revisar' },
      { label: 'Precio y forma de pago', value: 'Q 850,000.00 · transferencia bancaria', status: 'Completo' },
      { label: 'Solvencias', value: 'IUSI pendiente', status: 'Pendiente' },
    ],
    clauses: ['Comparecencia', 'Antecedentes de dominio', 'Precio', 'Saneamiento', 'Entrega material', 'Aceptacion'],
    preview:
      'NUMERO DIECIOCHO. En la ciudad de Guatemala, el trece de junio de dos mil veintiseis, ante mi, Eduardo Duarte, Notario, comparecen por una parte Maria Fernanda Lopez Herrera, quien actua en nombre propio, y por la otra parte el representante legal de Inmobiliaria Santa Clara, S.A....',
  },
  {
    id: 'gen-002',
    name: 'Mandato general con representacion',
    instrumentType: 'Escritura publica',
    description: 'Plantilla para mandato general con facultades administrativas, judiciales y de representacion.',
    requiredFields: [
      { label: 'Mandante', value: 'Inversiones Las Verapaces, S.A.', status: 'Completo' },
      { label: 'Mandatario', value: 'Pendiente de DPI y NIT', status: 'Pendiente' },
      { label: 'Facultades', value: 'Administrativas y judiciales', status: 'Revisar' },
      { label: 'Nombramiento vigente', value: 'Pendiente', status: 'Pendiente' },
    ],
    clauses: ['Comparecencia', 'Personeria', 'Otorgamiento de mandato', 'Facultades', 'Aceptacion', 'Revocatoria'],
    preview:
      'NUMERO DIECINUEVE. En la ciudad de Guatemala, el catorce de junio de dos mil veintiseis, ante mi, Eduardo Duarte, Notario, comparece el representante legal de Inversiones Las Verapaces, S.A., calidad que acredita con nombramiento pendiente de validacion...',
  },
  {
    id: 'gen-003',
    name: 'Acta de declaracion jurada',
    instrumentType: 'Acta notarial',
    description: 'Plantilla para documentar declaracion jurada de persona individual ante notario.',
    requiredFields: [
      { label: 'Declarante', value: 'Carlos Antonio Mejia Barrios', status: 'Completo' },
      { label: 'Objeto de declaracion', value: 'Relacion laboral y datos personales', status: 'Completo' },
      { label: 'Documento de identificacion', value: 'DPI vigente', status: 'Completo' },
    ],
    clauses: ['Requerimiento', 'Identificacion', 'Declaracion', 'Advertencias legales', 'Lectura y aceptacion', 'Firma'],
    preview:
      'En la ciudad de Guatemala, el diez de junio de dos mil veintiseis, siendo las diecisiete horas, yo, Eduardo Duarte, Notario, soy requerido por Carlos Antonio Mejia Barrios para hacer constar declaracion jurada...',
  },
]

export const notarialGeneratorActions = [
  'Validar campos requeridos',
  'Generar borrador',
  'Enviar a revision del Notario',
  'Marcar listo para firma',
  'Crear documento en expediente notarial',
]

export const teamWorkload: TeamWorkloadMock[] = [
  {
    id: 'team-001',
    name: 'Lic. Eduardo Duarte',
    role: 'Licenciado Principal / Notario',
    activeCases: 4,
    openTasks: 6,
    overdueTasks: 1,
    notarialItems: 4,
    nextDeadline: 'Revision de compraventa · Hoy 17:00',
    load: 'Alta',
  },
  {
    id: 'team-002',
    name: 'Licda. Sofia Cabrera',
    role: 'Abogada Asociada',
    activeCases: 2,
    openTasks: 4,
    overdueTasks: 0,
    notarialItems: 0,
    nextDeadline: 'Audiencia de alimentos · 2026-06-12',
    load: 'Normal',
  },
  {
    id: 'team-003',
    name: 'Andrea Mendez',
    role: 'Secretaria Senior',
    activeCases: 3,
    openTasks: 7,
    overdueTasks: 2,
    notarialItems: 3,
    nextDeadline: 'Preparar firma compraventa · Hoy 15:30',
    load: 'Critica',
  },
  {
    id: 'team-004',
    name: 'Lucia Castillo',
    role: 'Secretaria Limitada / Archivo',
    activeCases: 1,
    openTasks: 3,
    overdueTasks: 0,
    notarialItems: 2,
    nextDeadline: 'Archivar acta firmada · Manana',
    load: 'Normal',
  },
]

export const productivityAlerts: ProductivityAlertMock[] = [
  {
    title: 'Firma notarial con soporte incompleto',
    area: 'Notarial',
    severity: 'Alta',
    detail: 'La compraventa requiere certificacion registral e IUSI antes de firma.',
    owner: 'Andrea Mendez',
  },
  {
    title: 'Tareas vencidas en secretaria senior',
    area: 'Equipo',
    severity: 'Alta',
    detail: 'Dos tareas administrativas vencidas afectan expediente civil y preparacion notarial.',
    owner: 'Andrea Mendez',
  },
  {
    title: 'Vencimiento judicial proximo',
    area: 'Judicial',
    severity: 'Media',
    detail: 'Presentacion de liquidacion civil vence el 14/06/2026 a las 15:30.',
    owner: 'Lic. Eduardo Duarte',
  },
  {
    title: 'Documento pendiente de entrega',
    area: 'Documentos',
    severity: 'Normal',
    detail: 'Constancia de entrega de legalizacion pendiente de firma por cliente.',
    owner: 'Lucia Castillo',
  },
]

export const productivityQueues = [
  { label: 'Expedientes con proximo vencimiento', value: '3', detail: 'Civil, Familia y Laboral' },
  { label: 'Instrumentos notariales pendientes', value: '2', detail: 'Compraventa y mandato general' },
  { label: 'Documentos por revisar', value: '5', detail: '3 notariales, 2 judiciales' },
  { label: 'Citas/audiencias proximas', value: '6', detail: '4 notariales, 2 judiciales' },
]

export const riskDeadlines: RiskDeadlineMock[] = [
  {
    id: 'risk-001',
    title: 'Presentar liquidacion actualizada',
    area: 'Judicial',
    matter: 'C01002-2026-00418 · Civil ejecutivo',
    clientName: 'Inversiones Las Verapaces, S.A.',
    dueDate: '2026-06-14',
    dueTime: '15:30',
    daysLeft: 3,
    severity: 'Critico',
    status: 'En preparacion',
    owner: 'Andrea Mendez',
    backupOwner: 'Lic. Eduardo Duarte',
    source: 'Resolucion notificada en expediente civil',
    blocker: 'Falta confirmar monto final de intereses.',
    nextAction: 'Actualizar cuadro de liquidacion y enviar memorial a revision del Licenciado Principal.',
    escalation: 'Si no queda listo hoy a las 17:00, reasignar calculo a Sofia Cabrera.',
    checklist: [
      { label: 'Resolucion agregada al expediente', status: 'Listo' },
      { label: 'Facturas certificadas vinculadas', status: 'Listo' },
      { label: 'Calculo de intereses actualizado', status: 'Pendiente' },
      { label: 'Memorial revisado y firmado', status: 'Pendiente' },
    ],
  },
  {
    id: 'risk-002',
    title: 'Audiencia de pension alimenticia',
    area: 'Judicial',
    matter: 'FAM-01190-2026-00077 · Familia',
    clientName: 'Maria Fernanda Lopez Herrera',
    dueDate: '2026-06-12',
    dueTime: '09:00',
    daysLeft: 1,
    severity: 'Alto',
    status: 'Sin confirmar',
    owner: 'Licda. Sofia Cabrera',
    backupOwner: 'Andrea Mendez',
    source: 'Agenda judicial y citacion del juzgado',
    blocker: 'Testigo principal no ha confirmado asistencia.',
    nextAction: 'Llamar al testigo, preparar carpeta impresa y confirmar traslado a Torre de Tribunales.',
    escalation: 'Si el testigo no confirma antes de las 14:00, preparar declaracion alternativa.',
    checklist: [
      { label: 'Cliente confirmada', status: 'Listo' },
      { label: 'Prueba documental ordenada', status: 'Revisar' },
      { label: 'Testigo confirmado', status: 'Bloqueado' },
      { label: 'Carpeta fisica preparada', status: 'Pendiente' },
    ],
  },
  {
    id: 'risk-003',
    title: 'Firma de compraventa de inmueble',
    area: 'Notarial',
    matter: 'PROTO-2026-001 · Escritura 18',
    clientName: 'Maria Fernanda Lopez Herrera',
    dueDate: '2026-06-13',
    dueTime: '10:00',
    daysLeft: 2,
    severity: 'Critico',
    status: 'Bloqueado',
    owner: 'Andrea Mendez',
    backupOwner: 'Lic. Eduardo Duarte',
    source: 'Agenda notarial y checklist de comparecientes',
    blocker: 'Certificacion registral e IUSI no recibidos.',
    nextAction: 'Solicitar documentos vigentes al cliente y marcar revision previa del Notario.',
    escalation: 'Si faltan documentos al cierre del dia, reprogramar firma antes de preparar protocolo.',
    checklist: [
      { label: 'DPI y NIT de compradora', status: 'Listo' },
      { label: 'Representacion de vendedora', status: 'Revisar' },
      { label: 'Certificacion registral vigente', status: 'Bloqueado' },
      { label: 'Solvencia municipal/IUSI', status: 'Bloqueado' },
    ],
  },
  {
    id: 'risk-004',
    title: 'Conciliacion laboral',
    area: 'Judicial',
    matter: 'LAB-01043-2026-00121 · Laboral',
    clientName: 'Carlos Antonio Mejia Barrios',
    dueDate: '2026-06-18',
    dueTime: '11:00',
    daysLeft: 7,
    severity: 'Medio',
    status: 'En preparacion',
    owner: 'Lic. Mario Pineda',
    backupOwner: 'Licda. Sofia Cabrera',
    source: 'Agenda de audiencia laboral',
    blocker: 'Constancia laboral pendiente de version final.',
    nextAction: 'Revisar constancia escaneada y preparar propuesta de conciliacion.',
    escalation: 'Revisar con Licenciado Principal si la contraparte ofrece convenio.',
    checklist: [
      { label: 'Cedula de notificacion agregada', status: 'Listo' },
      { label: 'Constancia laboral final', status: 'Pendiente' },
      { label: 'Propuesta de conciliacion', status: 'Pendiente' },
      { label: 'Cliente citado', status: 'Listo' },
    ],
  },
  {
    id: 'risk-005',
    title: 'Entrega de legalizacion de firma',
    area: 'Documental',
    matter: 'LEG-2026-041 · Legalizacion',
    clientName: 'Cafe Atitlan Export, S.A.',
    dueDate: '2026-06-11',
    dueTime: '16:30',
    daysLeft: 0,
    severity: 'Alto',
    status: 'Listo',
    owner: 'Lucia Castillo',
    backupOwner: 'Andrea Mendez',
    source: 'Flujo de entrega documental',
    blocker: 'Sin bloqueo; falta constancia firmada al entregar.',
    nextAction: 'Verificar DPI de quien retira y archivar constancia de entrega.',
    escalation: 'Si retira tercero, solicitar autorizacion escrita antes de entregar.',
    checklist: [
      { label: 'Documento legalizado listo', status: 'Listo' },
      { label: 'Constancia de entrega preparada', status: 'Listo' },
      { label: 'Identidad de retiro verificada', status: 'Pendiente' },
      { label: 'Archivo de soporte actualizado', status: 'Pendiente' },
    ],
  },
]

export const riskWorkflowTemplates: RiskWorkflowTemplateMock[] = [
  {
    id: 'flow-judicial-001',
    title: 'Vencimiento judicial critico',
    area: 'Judicial',
    trigger: 'Resolucion notificada, plazo legal o audiencia dentro de 72 horas.',
    owner: 'Responsable del expediente',
    steps: [
      { label: 'Registrar fuente del plazo', owner: 'Secretaria', due: 'Mismo dia', control: 'Resolucion o citacion vinculada al expediente.' },
      { label: 'Crear tarea principal y respaldo', owner: 'Secretaria', due: 'Mismo dia', control: 'Responsable y suplente asignados.' },
      { label: 'Preparar documento o carpeta', owner: 'Abogado asignado', due: '24 horas antes', control: 'Checklist documental completo.' },
      { label: 'Revision final', owner: 'Licenciado Principal', due: 'Antes del vencimiento', control: 'Aprobacion registrada.' },
    ],
  },
  {
    id: 'flow-notarial-001',
    title: 'Firma notarial con comparecientes',
    area: 'Notarial',
    trigger: 'Cita de firma programada o instrumento marcado como pendiente de firma.',
    owner: 'Notario',
    steps: [
      { label: 'Validar identidad y representacion', owner: 'Auxiliar notarial', due: 'Antes de redactar', control: 'DPI, NIT y personeria revisados.' },
      { label: 'Completar soporte legal', owner: 'Secretaria', due: '24 horas antes', control: 'Certificaciones y solvencias vigentes.' },
      { label: 'Revisar borrador final', owner: 'Notario', due: 'Antes de imprimir', control: 'Clausulas y correlativo confirmados.' },
      { label: 'Cerrar entrega y archivo', owner: 'Secretaria', due: 'Posterior a firma', control: 'Testimonio, indice y constancia archivados.' },
    ],
  },
  {
    id: 'flow-doc-001',
    title: 'Entrega documental controlada',
    area: 'Documental',
    trigger: 'Documento listo para retiro, testimonio emitido o copia simple solicitada.',
    owner: 'Secretaria Senior',
    steps: [
      { label: 'Confirmar documento final', owner: 'Secretaria', due: 'Antes de citar', control: 'Version emitida vinculada.' },
      { label: 'Validar quien retira', owner: 'Recepcion', due: 'Al entregar', control: 'DPI o autorizacion cargada.' },
      { label: 'Firmar constancia de entrega', owner: 'Cliente o autorizado', due: 'Al entregar', control: 'Constancia escaneada.' },
      { label: 'Cerrar expediente documental', owner: 'Archivo', due: 'Mismo dia', control: 'Timeline y estado actualizados.' },
    ],
  },
]

export const riskOperatingRules = [
  'Todo vencimiento debe tener fuente, responsable, suplente y hora limite.',
  'Las citas notariales bloqueadas no deben llegar a firma sin soporte completo.',
  'Las tareas criticas requieren revision del Licenciado Principal antes de cerrarse.',
  'Toda entrega documental debe dejar constancia firmada y version archivada.',
]

export const caseTaskTemplates: CaseTaskTemplateMock[] = [
  {
    id: 'tpl-civil-001',
    title: 'Civil ejecutivo por cobro',
    area: 'Civil',
    caseType: 'Cobro judicial por incumplimiento contractual',
    objective: 'Ordenar demanda, soporte documental, liquidacion y vencimientos desde la apertura.',
    trigger: 'Cliente entrega contrato, facturas o documentos base de cobro.',
    recommendedOwner: 'Licenciado Principal',
    estimatedDuration: '5 a 10 dias habiles para preparacion inicial',
    riskLevel: 'Alto',
    stages: [
      {
        title: 'Ingreso y validacion',
        due: 'Dia 0',
        responsible: 'Secretaria Senior',
        tasks: ['Crear cliente y expediente', 'Cargar contrato base', 'Registrar monto reclamado', 'Asignar abogado responsable'],
      },
      {
        title: 'Preparacion de demanda',
        due: 'Dia 1-3',
        responsible: 'Abogado asignado',
        tasks: ['Revisar titulo ejecutivo', 'Preparar liquidacion', 'Redactar memorial inicial', 'Solicitar documentos faltantes'],
      },
      {
        title: 'Presentacion y seguimiento',
        due: 'Dia 4-10',
        responsible: 'Secretaria Senior',
        tasks: ['Presentar memorial', 'Registrar cargo de recepcion', 'Crear vencimientos de previos', 'Programar revision semanal'],
      },
    ],
    generatedTasks: [
      { title: 'Verificar titulo ejecutivo y legitimacion', ownerRole: 'Abogado', dueOffset: '24 horas', priority: 'Alta' },
      { title: 'Preparar liquidacion inicial', ownerRole: 'Secretaria', dueOffset: '48 horas', priority: 'Alta' },
      { title: 'Revisar memorial antes de presentar', ownerRole: 'Licenciado Principal', dueOffset: '72 horas', priority: 'Alta' },
      { title: 'Registrar cargo y proximo vencimiento', ownerRole: 'Secretaria', dueOffset: 'Al presentar', priority: 'Media' },
    ],
    requiredDocuments: ['Contrato base', 'Facturas o titulos de credito', 'RTU/NIT del cliente', 'Representacion legal si aplica', 'Liquidacion'],
    auditControls: ['Fuente del plazo', 'Version de memorial', 'Usuario que presenta', 'Cargo de recepcion'],
    handoff: 'Al presentar demanda, pasar a tablero de riesgos para controlar previos, notificaciones y embargos.',
  },
  {
    id: 'tpl-fam-001',
    title: 'Familia - pension alimenticia',
    area: 'Familia',
    caseType: 'Fijacion, modificacion o ejecucion de alimentos',
    objective: 'Preparar audiencia con cliente, prueba documental, testigos y propuesta de convenio.',
    trigger: 'Se agenda audiencia o se abre expediente familiar.',
    recommendedOwner: 'Abogada Asociada',
    estimatedDuration: '3 a 7 dias antes de audiencia',
    riskLevel: 'Alto',
    stages: [
      {
        title: 'Entrevista inicial',
        due: 'Dia 0',
        responsible: 'Abogada Asociada',
        tasks: ['Confirmar datos familiares', 'Registrar necesidades del alimentista', 'Solicitar ingresos y gastos', 'Crear agenda de audiencia'],
      },
      {
        title: 'Prueba y testigos',
        due: '72 horas antes',
        responsible: 'Secretaria Senior',
        tasks: ['Ordenar prueba documental', 'Confirmar testigos', 'Preparar carpeta fisica', 'Enviar recordatorio al cliente'],
      },
      {
        title: 'Audiencia y cierre',
        due: 'Dia de audiencia',
        responsible: 'Abogada Asociada',
        tasks: ['Registrar resultado', 'Crear tareas posteriores', 'Subir acta o resolucion', 'Actualizar riesgos'],
      },
    ],
    generatedTasks: [
      { title: 'Confirmar cliente y datos de audiencia', ownerRole: 'Secretaria', dueOffset: 'Mismo dia', priority: 'Alta' },
      { title: 'Preparar listado de prueba', ownerRole: 'Abogada', dueOffset: '72 horas antes', priority: 'Alta' },
      { title: 'Confirmar testigos', ownerRole: 'Secretaria', dueOffset: '48 horas antes', priority: 'Alta' },
      { title: 'Registrar resultado de audiencia', ownerRole: 'Abogada', dueOffset: 'Mismo dia', priority: 'Media' },
    ],
    requiredDocuments: ['DPI de cliente', 'Certificaciones familiares', 'Comprobantes de gastos', 'Comprobantes de ingresos', 'Citacion de audiencia'],
    auditControls: ['Confirmacion de cliente', 'Prueba revisada', 'Asistencia de testigos', 'Resultado de audiencia'],
    handoff: 'Toda audiencia dentro de 72 horas debe aparecer en riesgos con responsable y suplente.',
  },
  {
    id: 'tpl-lab-001',
    title: 'Laboral - conciliacion y prestaciones',
    area: 'Laboral',
    caseType: 'Reinstalacion, prestaciones o conciliacion laboral',
    objective: 'Controlar documentos laborales, calculo de prestaciones y preparacion de audiencia.',
    trigger: 'Cliente reporta despido, reclamo laboral o audiencia programada.',
    recommendedOwner: 'Abogado Asociado',
    estimatedDuration: '5 dias para armado inicial',
    riskLevel: 'Medio',
    stages: [
      {
        title: 'Levantamiento de informacion',
        due: 'Dia 0',
        responsible: 'Abogado Asociado',
        tasks: ['Registrar relacion laboral', 'Solicitar contrato o constancias', 'Registrar salario y fechas', 'Crear cliente si no existe'],
      },
      {
        title: 'Calculo y estrategia',
        due: 'Dia 1-3',
        responsible: 'Abogado Asociado',
        tasks: ['Calcular prestaciones', 'Definir postura de conciliacion', 'Preparar documentacion', 'Revisar con principal'],
      },
      {
        title: 'Audiencia',
        due: 'Dia de audiencia',
        responsible: 'Secretaria Senior',
        tasks: ['Confirmar asistencia', 'Imprimir carpeta', 'Registrar resultado', 'Crear tareas de seguimiento'],
      },
    ],
    generatedTasks: [
      { title: 'Cargar constancias y documentos laborales', ownerRole: 'Secretaria', dueOffset: '24 horas', priority: 'Media' },
      { title: 'Calcular prestaciones reclamadas', ownerRole: 'Abogado', dueOffset: '48 horas', priority: 'Alta' },
      { title: 'Revisar propuesta de conciliacion', ownerRole: 'Licenciado Principal', dueOffset: '72 horas', priority: 'Media' },
      { title: 'Actualizar timeline posterior a audiencia', ownerRole: 'Secretaria', dueOffset: 'Mismo dia', priority: 'Normal' },
    ],
    requiredDocuments: ['DPI', 'Contrato o constancia laboral', 'Recibos de salario', 'Carta de despido si existe', 'Citacion'],
    auditControls: ['Base de calculo', 'Version de propuesta', 'Confirmacion de cliente', 'Acta o resultado'],
    handoff: 'Si hay audiencia programada, crear vencimiento de preparacion y confirmar cliente 48 horas antes.',
  },
  {
    id: 'tpl-not-001',
    title: 'Notarial - compraventa de inmueble',
    area: 'Notarial',
    caseType: 'Escritura publica de compraventa',
    objective: 'Evitar firma sin identidad, representacion, solvencias y certificaciones vigentes.',
    trigger: 'Cliente solicita compraventa o se agenda firma notarial.',
    recommendedOwner: 'Notario',
    estimatedDuration: '24 a 72 horas antes de firma',
    riskLevel: 'Alto',
    stages: [
      {
        title: 'Ingreso notarial',
        due: 'Dia 0',
        responsible: 'Secretaria Senior',
        tasks: ['Registrar comparecientes', 'Crear instrumento', 'Solicitar DPI/NIT', 'Solicitar datos registrales'],
      },
      {
        title: 'Soporte y redaccion',
        due: '24 horas antes',
        responsible: 'Auxiliar notarial',
        tasks: ['Validar representacion', 'Revisar certificacion registral', 'Confirmar solvencias', 'Preparar borrador'],
      },
      {
        title: 'Firma y cierre',
        due: 'Dia de firma',
        responsible: 'Notario',
        tasks: ['Verificar originales', 'Autorizar instrumento', 'Escanear firmado', 'Programar testimonio e indice'],
      },
    ],
    generatedTasks: [
      { title: 'Validar DPI/NIT y personeria', ownerRole: 'Auxiliar notarial', dueOffset: 'Mismo dia', priority: 'Alta' },
      { title: 'Revisar certificacion registral e IUSI', ownerRole: 'Notario', dueOffset: '24 horas antes', priority: 'Alta' },
      { title: 'Preparar protocolo y borrador final', ownerRole: 'Secretaria', dueOffset: 'Antes de firma', priority: 'Alta' },
      { title: 'Emitir testimonio y registrar entrega', ownerRole: 'Secretaria', dueOffset: 'Posterior a firma', priority: 'Media' },
    ],
    requiredDocuments: ['DPI y NIT', 'Certificacion registral', 'Solvencia municipal/IUSI', 'Nombramiento si aplica', 'Minuta aprobada'],
    auditControls: ['Correlativo', 'Checklist de comparecientes', 'Revision del Notario', 'Constancia de entrega'],
    handoff: 'Si un documento falta, mover automaticamente a riesgos como firma bloqueada.',
  },
  {
    id: 'tpl-doc-001',
    title: 'Entrega documental controlada',
    area: 'Documental',
    caseType: 'Testimonios, copias simples, legalizaciones y documentos finales',
    objective: 'Registrar quien retira, version entregada y constancia firmada.',
    trigger: 'Documento marcado como emitido, vigente o listo para entrega.',
    recommendedOwner: 'Secretaria Senior',
    estimatedDuration: 'Mismo dia de entrega',
    riskLevel: 'Controlado',
    stages: [
      {
        title: 'Preparar entrega',
        due: 'Antes de cita',
        responsible: 'Secretaria Senior',
        tasks: ['Confirmar version final', 'Preparar constancia', 'Notificar cliente', 'Definir persona autorizada'],
      },
      {
        title: 'Validar retiro',
        due: 'Al entregar',
        responsible: 'Recepcion',
        tasks: ['Verificar DPI', 'Revisar autorizacion si aplica', 'Firmar constancia', 'Registrar hora de entrega'],
      },
      {
        title: 'Archivo',
        due: 'Mismo dia',
        responsible: 'Archivo',
        tasks: ['Escanear constancia', 'Actualizar estado', 'Cerrar tarea', 'Guardar evidencia en expediente'],
      },
    ],
    generatedTasks: [
      { title: 'Preparar constancia de entrega', ownerRole: 'Secretaria', dueOffset: 'Antes de cita', priority: 'Media' },
      { title: 'Verificar identidad de quien retira', ownerRole: 'Recepcion', dueOffset: 'Al entregar', priority: 'Alta' },
      { title: 'Escanear constancia firmada', ownerRole: 'Archivo', dueOffset: 'Mismo dia', priority: 'Media' },
      { title: 'Actualizar timeline del expediente', ownerRole: 'Secretaria', dueOffset: 'Mismo dia', priority: 'Normal' },
    ],
    requiredDocuments: ['Documento emitido', 'DPI de quien retira', 'Autorizacion si aplica', 'Constancia de entrega'],
    auditControls: ['Version entregada', 'Identidad verificada', 'Firma de recibido', 'Usuario que cierra'],
    handoff: 'La entrega cerrada alimenta documentos recientes y auditoria del expediente.',
  },
]

export const caseCreationWizard: CaseCreationWizardMock = {
  selectedClientId: 'cli-001',
  selectedClientName: 'Inversiones Las Verapaces, S.A.',
  selectedTemplateId: 'tpl-civil-001',
  draftCaseNumber: 'BOR-CIV-2026-0005',
  courtOrArea: 'Juzgado de Primera Instancia Civil por asignar',
  responsible: 'Lic. Eduardo Duarte',
  secretary: 'Andrea Mendez',
  openingReason: 'Cliente corporativo solicita cobro judicial por incumplimiento de contrato de suministro.',
  intakeFields: [
    { label: 'Cliente vinculado', value: 'Inversiones Las Verapaces, S.A.', status: 'Completo' },
    { label: 'Tipo de expediente', value: 'Civil ejecutivo por cobro', status: 'Completo' },
    { label: 'Monto estimado', value: 'Q 186,400.00 mas intereses', status: 'Revisar' },
    { label: 'Juzgado / area', value: 'Pendiente de asignacion', status: 'Pendiente' },
    { label: 'Responsable', value: 'Lic. Eduardo Duarte', status: 'Completo' },
    { label: 'Secretaria asignada', value: 'Andrea Mendez', status: 'Completo' },
  ],
  generatedMilestones: [
    { title: 'Abrir expediente y cargar contrato base', due: 'Hoy 15:00', owner: 'Andrea Mendez', source: 'Fase de ingreso' },
    { title: 'Validar titulo ejecutivo y legitimacion', due: 'Manana 10:00', owner: 'Lic. Eduardo Duarte', source: 'Tarea critica de plantilla' },
    { title: 'Preparar liquidacion inicial', due: '2026-06-13 12:00', owner: 'Andrea Mendez', source: 'Tarea generada' },
    { title: 'Revision final de memorial', due: '2026-06-14 09:00', owner: 'Lic. Eduardo Duarte', source: 'Control de auditoria' },
  ],
  generatedRisks: [
    { title: 'Titulo ejecutivo incompleto', severity: 'Alto', owner: 'Lic. Eduardo Duarte', due: '24 horas' },
    { title: 'Monto de intereses pendiente de confirmar', severity: 'Medio', owner: 'Andrea Mendez', due: '48 horas' },
    { title: 'Juzgado aun no asignado', severity: 'Controlado', owner: 'Secretaria Senior', due: 'Al presentar' },
  ],
  documentBuckets: [
    { title: 'Base contractual', documents: ['Contrato de suministro', 'Addendum o comunicaciones relevantes'], status: 'Pendiente' },
    { title: 'Soporte de cobro', documents: ['Facturas', 'Estado de cuenta', 'Liquidacion inicial'], status: 'Revisar' },
    { title: 'Identificacion y personeria', documents: ['RTU/NIT', 'Nombramiento representante legal', 'Patente de sociedad'], status: 'Listo' },
  ],
  reviewSteps: [
    { title: 'Revision de secretaria', owner: 'Andrea Mendez', detail: 'Confirmar campos obligatorios y documentos minimos antes de crear.' },
    { title: 'Revision juridica', owner: 'Lic. Eduardo Duarte', detail: 'Validar viabilidad, titulo ejecutivo y monto reclamado.' },
    { title: 'Activacion', owner: 'Licenciado Principal', detail: 'Crear expediente, generar tareas, registrar auditoria y enviar a riesgos.' },
  ],
}

export const principalReviewQueue: PrincipalReviewItemMock[] = [
  {
    id: 'rev-001',
    title: 'Activar expediente civil ejecutivo',
    source: 'Expediente',
    matter: 'BOR-CIV-2026-0005 · Civil ejecutivo por cobro',
    clientName: 'Inversiones Las Verapaces, S.A.',
    requestedBy: 'Andrea Mendez',
    submittedAt: 'Hoy 12:10',
    dueAt: 'Hoy 17:00',
    priority: 'Alta',
    status: 'Observado',
    decision: 'Solicitar cambios',
    reviewer: firmProfile.principal,
    summary: 'Borrador de expediente listo desde plantilla civil, pero falta confirmar intereses y juzgado asignado.',
    blockers: ['Monto final de intereses pendiente', 'Juzgado aun no asignado'],
    evidence: [
      { label: 'Cliente vinculado', status: 'Completo' },
      { label: 'Contrato base cargado', status: 'Completo' },
      { label: 'Liquidacion inicial', status: 'Revisar' },
      { label: 'Riesgos generados', status: 'Completo' },
    ],
    auditTrail: [
      { time: '11:42', actor: 'Andrea Mendez', action: 'Completo datos de apertura desde plantilla.' },
      { time: '12:10', actor: 'Andrea Mendez', action: 'Envio a revision del Licenciado Principal.' },
      { time: '12:22', actor: firmProfile.principal, action: 'Marco observacion sobre intereses.' },
    ],
  },
  {
    id: 'rev-002',
    title: 'Aprobar memorial de liquidacion',
    source: 'Documento',
    matter: 'C01002-2026-00418 · Civil ejecutivo',
    clientName: 'Inversiones Las Verapaces, S.A.',
    requestedBy: 'Andrea Mendez',
    submittedAt: 'Hoy 10:40',
    dueAt: '2026-06-14 09:00',
    priority: 'Alta',
    status: 'Pendiente',
    decision: 'Aprobar',
    reviewer: firmProfile.principal,
    summary: 'Memorial preparado para presentar liquidacion actualizada antes del vencimiento judicial.',
    blockers: ['Pendiente validar calculo final contra facturas certificadas'],
    evidence: [
      { label: 'Version DOCX revisable', status: 'Completo' },
      { label: 'Facturas certificadas', status: 'Completo' },
      { label: 'Cuadro de intereses', status: 'Revisar' },
      { label: 'Cargo previo asociado', status: 'Completo' },
    ],
    auditTrail: [
      { time: '09:18', actor: 'Andrea Mendez', action: 'Cargo facturas certificadas.' },
      { time: '10:40', actor: 'Andrea Mendez', action: 'Solicito aprobacion de memorial.' },
    ],
  },
  {
    id: 'rev-003',
    title: 'Autorizar firma de compraventa',
    source: 'Notarial',
    matter: 'PROTO-2026-001 · Escritura 18',
    clientName: 'Maria Fernanda Lopez Herrera',
    requestedBy: 'Andrea Mendez',
    submittedAt: 'Ayer 16:30',
    dueAt: '2026-06-13 09:00',
    priority: 'Alta',
    status: 'Observado',
    decision: 'Bloquear',
    reviewer: firmProfile.principal,
    summary: 'La firma esta programada, pero no debe autorizarse sin certificacion registral e IUSI vigente.',
    blockers: ['Certificacion registral no recibida', 'Solvencia municipal/IUSI pendiente', 'Representacion de vendedora en revision'],
    evidence: [
      { label: 'DPI y NIT de compradora', status: 'Completo' },
      { label: 'Borrador de escritura', status: 'Completo' },
      { label: 'Certificacion registral', status: 'Pendiente' },
      { label: 'Solvencia municipal/IUSI', status: 'Pendiente' },
    ],
    auditTrail: [
      { time: 'Ayer 15:10', actor: 'Andrea Mendez', action: 'Confirmo cita de firma.' },
      { time: 'Ayer 16:30', actor: 'Andrea Mendez', action: 'Envio expediente notarial a revision.' },
      { time: 'Hoy 08:15', actor: firmProfile.principal, action: 'Solicito bloquear firma hasta soporte completo.' },
    ],
  },
  {
    id: 'rev-004',
    title: 'Cerrar entrega de legalizacion',
    source: 'Documento',
    matter: 'LEG-2026-041 · Legalizacion',
    clientName: 'Cafe Atitlan Export, S.A.',
    requestedBy: 'Lucia Castillo',
    submittedAt: 'Hoy 09:50',
    dueAt: 'Hoy 16:30',
    priority: 'Media',
    status: 'Listo para aprobar',
    decision: 'Aprobar',
    reviewer: firmProfile.principal,
    summary: 'Documento legalizado listo para entrega con constancia preparada e identidad por verificar al retiro.',
    blockers: [],
    evidence: [
      { label: 'Documento legalizado', status: 'Completo' },
      { label: 'Constancia preparada', status: 'Completo' },
      { label: 'Persona autorizada', status: 'Completo' },
      { label: 'Firma de recibido', status: 'Pendiente' },
    ],
    auditTrail: [
      { time: '09:20', actor: 'Lucia Castillo', action: 'Genero constancia de entrega.' },
      { time: '09:50', actor: 'Lucia Castillo', action: 'Solicito visto bueno para entrega.' },
    ],
  },
  {
    id: 'rev-005',
    title: 'Revisar propuesta de conciliacion laboral',
    source: 'Tarea critica',
    matter: 'LAB-01043-2026-00121 · Laboral',
    clientName: 'Carlos Antonio Mejia Barrios',
    requestedBy: 'Lic. Mario Pineda',
    submittedAt: 'Hoy 11:05',
    dueAt: '2026-06-17 15:00',
    priority: 'Media',
    status: 'Pendiente',
    decision: 'Aprobar',
    reviewer: firmProfile.principal,
    summary: 'Propuesta de conciliacion preparada para audiencia laboral, pendiente de validacion de calculo.',
    blockers: ['Constancia laboral final pendiente de version limpia'],
    evidence: [
      { label: 'Calculo de prestaciones', status: 'Completo' },
      { label: 'Constancia laboral', status: 'Revisar' },
      { label: 'Citacion de audiencia', status: 'Completo' },
      { label: 'Propuesta editable', status: 'Completo' },
    ],
    auditTrail: [
      { time: '10:35', actor: 'Lic. Mario Pineda', action: 'Actualizo calculo de prestaciones.' },
      { time: '11:05', actor: 'Lic. Mario Pineda', action: 'Envio propuesta a revision.' },
    ],
  },
]

export const principalReviewPolicies: PrincipalReviewPolicyMock[] = [
  {
    title: 'Apertura de expediente desde plantilla',
    appliesTo: 'Todo expediente nuevo generado por secretaria',
    rule: 'No se activa hasta validar cliente, responsable, documentos minimos y primer riesgo.',
    owner: firmProfile.principal,
  },
  {
    title: 'Documento judicial para presentar',
    appliesTo: 'Memoriales, liquidaciones, convenios y escritos con plazo',
    rule: 'Debe tener version, fuente del plazo, evidencia de soporte y aprobacion antes de presentarse.',
    owner: firmProfile.principal,
  },
  {
    title: 'Firma notarial',
    appliesTo: 'Instrumentos pendientes de firma o autorizacion',
    rule: 'Se bloquea si falta identidad, representacion, certificacion, solvencia o minuta final.',
    owner: firmProfile.notary,
  },
  {
    title: 'Entrega documental',
    appliesTo: 'Testimonios, legalizaciones y copias simples',
    rule: 'Debe confirmar persona autorizada y generar constancia antes de cerrar entrega.',
    owner: 'Secretaria Senior',
  },
]

export const templateOperatingRules = [
  'Toda plantilla debe crear responsable principal, suplente y primera fecha limite.',
  'Las tareas generadas deben heredar cliente, expediente, organizacion y prioridad.',
  'Los documentos requeridos funcionan como checklist antes de cerrar una fase.',
  'Si una tarea critica vence o se bloquea, debe aparecer en riesgos y vencimientos.',
]

export const workflowSteps: Array<{ title: string; owner: string; status: string; detail: string; icon: LucideIcon }> = [
  {
    title: 'Licenciado Principal invita secretaria',
    owner: firmProfile.principal,
    status: 'Preparado',
    detail: `${firmProfile.invitedSecretaryEmail} queda pendiente de aceptar invitacion.`,
    icon: UserPlus,
  },
  {
    title: 'Secretaria accede al sistema',
    owner: firmProfile.invitedSecretary,
    status: 'Mockeado',
    detail: 'Sesion vinculada a la organizacion y permisos de Secretaria Senior.',
    icon: ShieldCheck,
  },
  {
    title: 'Secretaria crea cliente',
    owner: firmProfile.invitedSecretary,
    status: 'Listo para CRUD',
    detail: 'Ejemplo: Distribuidora El Progreso con DPI/NIT y notas iniciales.',
    icon: Users,
  },
  {
    title: 'Secretaria crea expediente',
    owner: firmProfile.invitedSecretary,
    status: 'Listo para CRUD',
    detail: 'Se relaciona con cliente, responsable, juzgado y tipo de proceso.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Secretaria sube documentos',
    owner: firmProfile.invitedSecretary,
    status: 'Auditado futuro',
    detail: 'Cada carga se vincula a organizacion, expediente, version y uploader.',
    icon: FileArchive,
  },
]

export const dashboardMetrics = [
  {
    label: 'Expedientes activos',
    value: String(caseFiles.length),
    helper: `${caseFiles.reduce((sum, item) => sum + item.tasksOpen, 0)} tareas abiertas`,
    icon: BriefcaseBusiness,
  },
  {
    label: 'Audiencias proximas',
    value: String(hearings.filter((event) => event.type === 'Audiencia').length),
    helper: 'Proximos 10 dias judiciales',
    icon: CalendarClock,
  },
  {
    label: 'Tareas pendientes',
    value: String(tasks.filter((task) => task.status !== 'Completada').length),
    helper: '2 con prioridad alta o media',
    icon: SquareCheckBig,
  },
  {
    label: 'Documentos recientes',
    value: String(documents.length),
    helper: 'Versiones y auditoria preparadas',
    icon: FileArchive,
  },
]

export const dashboardAlerts = [
  'Audiencia de alimentos manana a las 09:00 en Torre de Tribunales.',
  'Vence presentacion de liquidacion civil el 14/06/2026 a las 15:30.',
  'Invitacion pendiente para Secretaria Senior: secretaria@mayora.gt.',
]

export const caseTimeline = [
  { label: 'Cliente creado', date: '2026-06-07', detail: 'Secretaria Senior registro datos de contacto y NIT.' },
  { label: 'Expediente abierto', date: '2026-06-08', detail: 'Licenciado Principal asigno responsable y tipo de proceso.' },
  { label: 'Documento subido', date: '2026-06-10', detail: 'Se cargo PDF con version y usuario uploader.' },
  { label: 'Tarea generada', date: '2026-06-11', detail: 'Memorial y agenda quedaron vinculados al expediente.' },
]

export const brandSignals = [
  'Operaciones multi-organizacion',
  'Auditoria juridica desde el inicio',
  'Documentos vinculados a expediente',
]

export const courtSummary = {
  label: 'Juzgados con movimiento',
  value: '4',
  helper: 'Civil, Familia, Laboral y Mercantil',
  icon: Scale,
}

// --- Directorio unificado de Personas (Clientes + Comparecientes) ---
// Una sola entidad reutilizable por ambos pilares: una persona puede ser
// cliente de un juicio y, a la vez, compareciente de una escritura.

export type PersonRole = 'Cliente' | 'Compareciente'

export type DirectoryPerson = {
  id: string
  name: string
  type: string
  dpi: string | null
  nit: string | null
  email: string | null
  phone: string | null
  address: string | null
  roles: PersonRole[]
  juicios: number
  escrituras: number
  href: string
}

const normalizeName = (value: string) => value.trim().toLowerCase()

// Cantidad de escrituras vinculadas a una persona, por nombre, sin duplicar
// instrumentos referenciados tanto en el instrumento como en el compareciente.
function escriturasForName(name: string): number {
  const ids = new Set<string>()
  notarialInstruments.forEach((instrument) => {
    if (normalizeName(instrument.clientName) === normalizeName(name)) ids.add(instrument.id)
  })
  notarialParties.forEach((party) => {
    if (normalizeName(party.name) === normalizeName(name)) party.instruments.forEach((id) => ids.add(id))
  })
  return ids.size
}

export function buildPeopleDirectory(): DirectoryPerson[] {
  const byName = new Map<string, DirectoryPerson>()

  clients.forEach((client) => {
    byName.set(normalizeName(client.name), {
      id: client.id,
      name: client.name,
      type: client.type,
      dpi: client.dpi === '-' ? null : client.dpi,
      nit: client.nit === '-' ? null : client.nit,
      email: client.email,
      phone: client.phone,
      address: client.address,
      roles: ['Cliente'],
      juicios: client.activeCases,
      escrituras: escriturasForName(client.name),
      href: `/clientes/${client.id}`,
    })
  })

  notarialParties.forEach((party) => {
    const key = normalizeName(party.name)
    const existing = byName.get(key)
    if (existing) {
      if (!existing.roles.includes('Compareciente')) existing.roles.push('Compareciente')
      return
    }
    byName.set(key, {
      id: party.id,
      name: party.name,
      type: party.type,
      dpi: party.dpi === '-' ? null : party.dpi,
      nit: party.nit === '-' ? null : party.nit,
      email: party.email,
      phone: party.phone,
      address: party.address,
      roles: ['Compareciente'],
      juicios: 0,
      escrituras: escriturasForName(party.name),
      href: '/escrituras/comparecientes',
    })
  })

  return Array.from(byName.values()).sort((a, b) => a.name.localeCompare(b.name, 'es'))
}

// --- Vistas transversales con pilar (Juicios + Escrituras) ---

const caseIdByNumber = new Map(caseFiles.map((c) => [c.caseNumber, c.id]))
const instrumentById = new Map(notarialInstruments.map((i) => [i.id, i]))

export type CalendarItem = {
  id: string
  pillar: Pillar
  title: string
  date: string
  time: string
  location: string
  kind: string
  reference: string
  responsible: string
  href: string
}

export function unifiedCalendar(): CalendarItem[] {
  const judicial: CalendarItem[] = hearings.map((event) => {
    const caseId = caseIdByNumber.get(event.caseNumber)
    return {
      id: event.id,
      pillar: 'Juicios',
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      kind: event.type,
      reference: event.caseNumber,
      responsible: event.responsible,
      href: caseId ? `/juicios/${caseId}` : '/juicios/audiencias',
    }
  })

  const notarial: CalendarItem[] = notarialAppointments.map((appt) => {
    const instrument = instrumentById.get(appt.instrumentId)
    return {
      id: appt.id,
      pillar: 'Escrituras',
      title: appt.title,
      date: appt.date,
      time: appt.time,
      location: appt.location,
      kind: appt.type,
      reference: instrument?.protocolNumber ?? appt.instrumentId,
      responsible: appt.responsible,
      href: `/escrituras/${appt.instrumentId}`,
    }
  })

  return [...judicial, ...notarial].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
}

export type DocItem = {
  id: string
  pillar: Pillar
  name: string
  reference: string
  kind: string
  status: string
  owner: string
  href: string
}

export function unifiedDocuments(): DocItem[] {
  const judicial: DocItem[] = documents.map((doc) => ({
    id: doc.id,
    pillar: 'Juicios',
    name: doc.name,
    reference: doc.caseNumber,
    kind: `${doc.fileType} · v${doc.version}`,
    status: doc.status,
    owner: doc.uploadedBy,
    href: `/documentos/${doc.id}`,
  }))

  const notarial: DocItem[] = notarialDocumentFlow.map((doc) => {
    const instrument = instrumentById.get(doc.instrumentId)
    return {
      id: doc.id,
      pillar: 'Escrituras',
      name: doc.name,
      reference: instrument?.protocolNumber ?? doc.instrumentId,
      kind: doc.category,
      status: doc.status,
      owner: doc.owner,
      href: `/escrituras/${doc.instrumentId}`,
    }
  })

  return [...judicial, ...notarial]
}
