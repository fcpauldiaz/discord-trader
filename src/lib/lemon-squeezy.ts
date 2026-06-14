export const LEMON_SQUEEZY_CHECKOUT_URL =
  import.meta.env.VITE_LEMON_SQUEEZY_CHECKOUT_URL || 'https://your-store.lemonsqueezy.com/checkout/buy/pro'

export function checkoutUrl(userId: string, email: string): string {
  const url = new URL(LEMON_SQUEEZY_CHECKOUT_URL)
  url.searchParams.set('checkout[email]', email)
  url.searchParams.set('checkout[custom][user_id]', userId)
  return url.toString()
}
