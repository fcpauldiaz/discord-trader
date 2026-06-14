export function getApiKey(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('api_key')
}

export function setApiKey(key: string) {
  localStorage.setItem('api_key', key)
}

export function clearApiKey() {
  localStorage.removeItem('api_key')
}

export function isLoggedIn(): boolean {
  return Boolean(getApiKey())
}
