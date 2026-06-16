const RECEIVER_API_URL = process.env.VITE_RECEIVER_API_URL || process.env.RECEIVER_API_URL || 'http://localhost:8000'
const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET || 'dev-internal-secret'

export type DeviceTokenResult = {
  api_key: string
  ingest_url: string
}

export async function issueDeviceToken(authId: string, email: string): Promise<DeviceTokenResult> {
  const res = await fetch(`${RECEIVER_API_URL}/v1/internal/device-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Internal-Secret': INTERNAL_API_SECRET,
    },
    body: JSON.stringify({ auth_id: authId, email }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to issue device token')
  }
  return res.json() as Promise<DeviceTokenResult>
}
