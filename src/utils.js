import { CONFIG } from './config'

export const byId = Object.fromEntries(CONFIG.MENU.map((m) => [m.id, m]))
export const money = (n) => CONFIG.CURRENCY + n.toLocaleString('en-IN')

export const pic = (p) =>
  p.img ||
  'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80"><rect width="100" height="80" fill="hsl(${(p.id * 47) % 360} 65% 88%)"/><text x="50" y="55" font-size="44" text-anchor="middle">${p.e}</text></svg>`
    )

export function totals(cart) {
  let sub = 0, fin = 0
  for (const id in cart) { sub += byId[id].mrp * cart[id]; fin += byId[id].price * cart[id] }
  return { sub, fin, disc: sub - fin }
}

export function buildMessage(cart, t, name) {
  const T2 = totals(cart)
  const L = [t('hello'), '', t('od'), '']
  Object.keys(cart).forEach((id, i) => {
    const p = byId[id], q = cart[id]
    L.push(`${i + 1}. ${name(p)}`, `   ${t('qty')}: ${q}`, `   ${t('price')}: ${money(p.mrp)} x ${q} = ${money(p.mrp * q)}`, '')
  })
  L.push(`${t('sub')}: ${money(T2.sub)}`, `${t('disc')}: ${money(T2.disc)}`, `${t('fin')}: ${money(T2.fin)}`, '', t('ok'))
  return L.join('\n')
}

/** Opens WhatsApp. Returns 'config' if the number is not set. Never clears the cart. */
export function sendWhatsApp(message) {
  const num = String(CONFIG.WHATSAPP_NUMBER || '')
  if (!/^\d{10,15}$/.test(num)) return 'config'
  const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`
  const w = window.open(url, '_blank')
  if (!w) window.location.href = url // pop-up blocked (some iPhone browsers)
  return 'ok'
}
