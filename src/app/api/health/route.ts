export async function GET() {
  return Response.json({ ok: true, service: 'luris', timestamp: new Date().toISOString() })
}
