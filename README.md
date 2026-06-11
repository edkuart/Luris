# Luris

Luris es una plataforma SaaS juridica privada para abogados, licenciados, secretarias y equipos legales en Guatemala. La aplicacion nace como una herramienta cerrada de gestion profesional, sin landing publica: la ruta raiz redirige directamente al login.

## Objetivo

Centralizar la operacion diaria de un despacho juridico: clientes, expedientes, documentos, calendario judicial, tareas, usuarios, roles, permisos, auditoria y una futura capa de IA juridica conectable a OpenAI o Anthropic.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS 4
- Shadcn/UI compatible via `components.json`
- React Hook Form + Zod preparados
- Prisma ORM + PostgreSQL
- JWT/sesiones preparadas con `jose`
- Storage configurable: local, S3 compatible o Supabase

## Instalacion

```bash
cd C:\Users\Dell\Projects\Luris
npm install
copy .env.example .env
npm run prisma:generate
npm run dev
```

La aplicacion corre por defecto en `http://localhost:3000`.

## Variables de entorno

Ver `.env.example`:

- `DATABASE_URL`: conexion PostgreSQL.
- `AUTH_SECRET`: secreto de autenticacion de al menos 32 caracteres.
- `APP_URL`: URL publica/local de la app.
- `STORAGE_PROVIDER`: `local`, `s3` o `supabase`.
- `AI_PROVIDER`: `disabled`, `openai` o `anthropic`.

## Estructura

```text
src/
  app/
    login/
    (private)/
      dashboard/
      clientes/
      expedientes/
      documentos/
      calendario/
      tareas/
      usuarios/
      configuracion/
      admin/
      ia-juridica/
      cumplimiento/
    api/health/
  components/
    layout/
    ui/
  lib/
  server/
    ai/
    audit/
    auth/
    permissions/
    storage/
  types/
prisma/
```

## Fases completadas

- Proyecto base Next.js + TypeScript + Tailwind.
- Configuracion compatible con Shadcn/UI.
- Redireccion `/` -> `/login`.
- Login privado con identidad visual Luris.
- Layout privado tipo ERP juridico.
- Dashboard placeholder con tarjetas juridicas.
- Rutas base para clientes, expedientes, documentos, calendario, tareas, usuarios, configuracion, admin SaaS, IA juridica y cumplimiento.
- Prisma schema inicial multi-organizacion.
- Roles base, permisos iniciales y acciones auditables documentadas en codigo.
- Stubs para auditoria, storage seguro e IA futura.

## Fases pendientes

- Instalar dependencias y validar build en el entorno final.
- Implementar autenticacion real email/password con hash seguro.
- Implementar CRUD real de clientes y expedientes.
- Conectar Prisma a PostgreSQL y crear migracion inicial.
- Implementar invitaciones por correo.
- Implementar subida de documentos con auditoria.
- Aplicar controles de permisos en route handlers/server actions.
- Agregar MFA.
- Crear tests unitarios e integracion.

## Nota de naming

La solicitud menciona `Duris` en algunas fases, pero el nombre objetivo y la ruta principal solicitada son `Luris`. El proyecto tecnico se creo como `Luris`.

## Usuario inicial

Se agrego el script `npm run seed:initial-user` para crear o actualizar el usuario inicial sin guardar la contrasena en archivos. Requiere `DATABASE_URL` y `SEED_USER_PASSWORD` en el entorno.

```bash
SEED_USER_EMAIL="edkuart@gmail.com" \
SEED_USER_PASSWORD="<contrasena>" \
SEED_USER_NAME="Edkuart" \
SEED_ORGANIZATION_NAME="Despacho Luris Guatemala" \
npm run seed:initial-user
```

El usuario queda como `LICENCIADO_PRINCIPAL`, `ACTIVE`, vinculado a una organizacion inicial y con evento de auditoria.
