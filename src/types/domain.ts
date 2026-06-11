export const BASE_ROLES = [
  'SUPER_ADMIN',
  'LICENCIADO_PRINCIPAL',
  'ABOGADO_ASOCIADO',
  'SECRETARIA_SENIOR',
  'SECRETARIA_LIMITADA',
  'CLIENTE_INVITADO',
] as const

export type BaseRole = (typeof BASE_ROLES)[number]

export const AUDIT_ACTIONS = [
  'auth.login',
  'case_file.create',
  'case_file.update',
  'document.upload',
  'document.download',
  'entity.soft_delete',
  'permission.change',
  'user.invite',
] as const

export type AuditAction = (typeof AUDIT_ACTIONS)[number]
