const RECEIVER_API_URL = process.env.VITE_RECEIVER_API_URL || process.env.RECEIVER_API_URL || 'http://localhost:8000'
const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET || 'dev-internal-secret'

export type ProvisionUser = {
  id: string
  email: string
  name?: string | null
}

export async function provisionReceiverUser(user: ProvisionUser): Promise<void> {
  const res = await fetch(`${RECEIVER_API_URL}/v1/internal/provision`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Internal-Secret': INTERNAL_API_SECRET,
    },
    body: JSON.stringify({
      auth_id: user.id,
      email: user.email,
      name: user.name ?? null,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Receiver provision failed: ${text || res.statusText}`)
  }
}
