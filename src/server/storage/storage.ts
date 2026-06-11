export type StorageProvider = 'local' | 's3' | 'supabase'

export type DocumentStorageTarget = {
  organizationId: string
  caseFileId: string
  documentId: string
  fileName: string
}

export function buildDocumentKey(target: DocumentStorageTarget) {
  return [target.organizationId, 'case-files', target.caseFileId, target.documentId, target.fileName].join('/')
}
