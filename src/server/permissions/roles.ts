import type { BaseRole } from '@/types/domain'

export const ROLE_PERMISSIONS: Record<BaseRole, string[]> = {
  SUPER_ADMIN: ['*'],
  LICENCIADO_PRINCIPAL: [
    'organization.manage',
    'users.invite',
    'clients.manage',
    'case_files.manage',
    'documents.manage',
    'calendar.manage',
    'tasks.manage',
    'audit.read',
  ],
  ABOGADO_ASOCIADO: ['assigned_cases.read', 'assigned_cases.update', 'documents.upload', 'tasks.create'],
  SECRETARIA_SENIOR: ['clients.create', 'case_files.create', 'documents.upload', 'calendar.manage', 'notes.write'],
  SECRETARIA_LIMITADA: ['assigned_modules.read', 'documents.upload', 'notes.write'],
  CLIENTE_INVITADO: ['client_portal.read_authorized'],
}

export function can(role: BaseRole, permission: string) {
  const permissions = ROLE_PERMISSIONS[role]
  return permissions.includes('*') || permissions.includes(permission)
}
