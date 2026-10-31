import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CONFIG } from '../config'
import { T } from '../i18n'
import { byId, totals } from '../utils'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

const read = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v) } catch { return d } }
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => read('lang', 'en'))
  const [theme, setTheme] = useState(() => read('theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [cart, setCart] = useState(() =>
    Object.fromEntries(Object.entries(read('cart', {})).filter(([id, q]) => byId[id] && q > 0))
  )
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => write('cart', cart), [cart])
  useEffect(() => write('lang', lang), [lang])
  useEffect(() => { write('theme', theme); document.documentElement.classList.toggle('dark', theme === 'dark') }, [theme])
  useEffect(() => { document.documentElement.lang = lang; document.title = CONFIG.RESTAURANT_NAME[lang] }, [lang])
  useEffect(() => { // keep tabs in sync
    const f = (e) => e.key === 'cart' && setCart(read('cart', {}))
    addEventListener('storage', f); return () => removeEventListener('storage', f)
  }, [])
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(''), 1800); return () => clearTimeout(id) }, [toast])

  const t = useCallback((k) => T[lang][k], [lang])
  const name = useCallback((o) => o[lang] || o.en, [lang])
  const notify = useCallback((m) => setToast(m), [])

  const value = useMemo(() => ({
    lang, t, name, toast, notify, query, setQuery, theme, cart,
    toggleLang: () => setLang((l) => (l === 'en' ? 'hi' : 'en')),
    toggleTheme: () => setTheme((x) => (x === 'dark' ? 'light' : 'dark')),
    count: Object.values(cart).reduce((a, b) => a + b, 0),
    totals: totals(cart),
    add: (id) => { setCart((c) => ({ ...c, [id]: 1 })); setToast(T[lang].added) },
    inc: (id) => setCart((c) => ({ ...c, [id]: Math.min(99, (c[id] || 0) + 1) })),
    dec: (id) => setCart((c) => { const n = { ...c }; if (--n[id] <= 0) delete n[id]; return n }),
    remove: (id) => setCart((c) => { const n = { ...c }; delete n[id]; return n }),
    clear: () => setCart({}),
  }), [lang, t, name, toast, notify, query, theme, cart])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
