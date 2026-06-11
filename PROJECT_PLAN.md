# PROJECT PLAN - Luris

## Vision

Construir una plataforma SaaS juridica privada, segura y sobria para despachos guatemaltecos. Luris debe sentirse como software profesional de oficina: confiable, minimo, auditable y preparado para crecer hacia IA juridica.

## Fase 1 - Proyecto base

Estado: iniciado.

- Crear `Projects/Luris`.
- Configurar Next.js, TypeScript, Tailwind CSS, ESLint y Prettier.
- Dejar `components.json` para Shadcn/UI.
- Crear estructura limpia en `src/app`, `src/components`, `src/lib`, `src/server`, `src/types` y `prisma`.

## Fase 2 - Login privado

Estado: iniciado.

- Redirigir `/` a `/login`.
- Crear pantalla de login con logo textual Luris.
- Incluir correo, contrasena, boton y recuperacion de contrasena.
- Mantener tono sobrio cafe/crema con acentos dorados, sage y steel.

## Fase 3 - Base de datos

Estado: modelado inicial.

Modelos incluidos:

- User
- Organization
- Role
- Permission
- RolePermission
- Client
- CaseFile
- Document
- Task
- CalendarEvent
- AuditLog
- Invitation
- AuthSession

Pendiente:

- Crear migracion inicial.
- Revisar indices con datos reales.
- Agregar politicas de retencion y soft delete por entidad.

## Fase 4 - Roles y permisos

Estado: base preparada.

Roles:

- Super Admin
- Licenciado Principal
- Abogado Asociado
- Secretaria Senior
- Secretaria Limitada
- Cliente Invitado

Pendiente:

- Matriz completa por modulo.
- Middleware/server checks.
- UI de administracion de permisos.

## Fase 5 - Dashboard

Estado: placeholder implementado.

Tarjetas iniciales:

- Expedientes activos
- Audiencias proximas
- Tareas pendientes
- Documentos recientes
- Clientes recientes
- Alertas importantes

## Fase 6 - Clientes

Estado: UI inicial.

Campos previstos:

- Nombre completo
- DPI
- NIT
- Correo
- Telefono
- Direccion
- Observaciones

Pendiente:

- CRUD real.
- Busqueda server-side.
- Vista de expedientes asociados.

## Fase 7 - Expedientes

Estado: UI inicial.

Campos previstos:

- Cliente
- Titulo del caso
- Numero de expediente
- Juzgado
- Tipo de proceso
- Estado
- Responsable
- Descripcion
- Fechas importantes

Tabs previstos:

- Resumen
- Documentos
- Tareas
- Calendario
- Linea de tiempo
- Notas

## Fase 8 - Documentos

Estado: estructura preparada.

Funciones previstas:

- Subir documento
- Asociarlo a expediente
- Ver lista
- Registrar usuario uploader
- Versiones
- OCR futuro
- Busqueda inteligente futura
- Soft delete auditado

## Fase 9 - Calendario y tareas

Estado: placeholders implementados.

Eventos:

- Audiencia
- Vencimiento
- Reunion
- Presentacion de documento
- Recordatorio interno

Tareas:

- Titulo
- Descripcion
- Asignado a
- Fecha limite
- Estado
- Expediente relacionado

## Fase 10 - Usuarios e invitaciones

Estado: modelo y UI preparados.

Flujo:

1. Licenciado crea invitacion.
2. Usuario recibe correo.
3. Usuario crea contrasena.
4. Usuario entra al sistema.
5. Usuario queda vinculado a la organizacion.

Pendiente:

- Token seguro de invitacion.
- Envio real de correo.
- Pantalla de aceptacion.

## Fase 11 - Seguridad

Estado: fundamentos preparados.

Principios:

- Aislamiento por organizacion.
- Auditoria de acciones sensibles.
- Validacion de permisos en backend.
- Hash seguro de contrasenas.
- MFA futuro.
- No logs sensibles.
- Documentos siempre vinculados a organizacion.
- Registrar accesos a expedientes y documentos.

Acciones auditables:

- Login
- Creacion de expediente
- Edicion de expediente
- Subida de documento
- Descarga de documento
- Eliminacion logica
- Cambio de permisos
- Invitacion de usuario

## Fase 12 - Administracion SaaS

Estado: UI inicial.

Funciones previstas:

- Ver organizaciones
- Ver usuarios por organizacion
- Ver estado de suscripcion
- Activar/desactivar organizaciones
- Definir planes manualmente

Planes:

- Individual
- Profesional
- Empresarial

## Fase 13 - IA Juridica futura

Estado: placeholder implementado.

Casos futuros:

- Resumir expedientes
- Buscar informacion dentro de documentos
- Crear borradores
- Consultar documentos del caso
- Analizar linea de tiempo
- Preparar respuestas usando OpenAI o Anthropic

## Fase 14 - Politicas y cumplimiento

Estado: paginas internas base creadas.

Documentos:

- Politica de privacidad
- Terminos de uso
- Acuerdo de confidencialidad
- Politica de manejo de datos
- Politica de respaldo

## Fase 15 - Documentacion

Estado: iniciado.

Incluye:

- README.md
- PROJECT_PLAN.md

## Siguiente iteracion recomendada

1. Instalar dependencias.
2. Ejecutar `npm run typecheck` y `npm run build`.
3. Crear migracion Prisma inicial.
4. Implementar auth real y proteccion de rutas.
5. Implementar CRUD de clientes como primer modulo funcional.

## Actualizacion - Usuario inicial

Se agrego `prisma/seed-initial-user.mjs` y el script `npm run seed:initial-user`. El seed crea/actualiza el usuario inicial, genera hash `scrypt` de la contrasena, crea la organizacion si no existe, asigna el rol `LICENCIADO_PRINCIPAL` y registra auditoria.

La ejecucion directa quedo pendiente porque la base local rechazo las credenciales por defecto. Falta configurar `DATABASE_URL` real y ejecutar migraciones.
