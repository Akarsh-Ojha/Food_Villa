import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronDown, FiMoon, FiSearch, FiShoppingCart, FiSun } from 'react-icons/fi'
import { MdRestaurantMenu } from 'react-icons/md'
import { useApp } from '../context/AppContext'
import { CONFIG } from '../config'

const lk = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 ${isActive ? 'font-semibold text-leaf dark:text-green-300' : ''}`
const ib = 'relative inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-stone-300 px-2 text-sm font-semibold hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10'

export default function Navbar() {
  const { t, name, lang, toggleLang, theme, toggleTheme, count, query, setQuery } = useApp()
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur dark:border-white/10 dark:bg-nightcard/95">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2 md:flex-nowrap md:gap-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-leaf dark:text-green-300">
          <MdRestaurantMenu className="text-2xl" /> {name(CONFIG.RESTAURANT_NAME)}
        </Link>

        <nav className="ml-3 hidden items-center gap-1 md:flex" aria-label="Main">
          <NavLink to="/" end className={lk}>{t('home')}</NavLink>
          <NavLink to="/menu" end className={lk}>{t('menu')}</NavLink>
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10" aria-expanded={open}>
              {t('cats')} <FiChevronDown className={`transition ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {open && (
                <>
                  <div className="fixed inset-0" onClick={() => setOpen(false)} />
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-nightcard">
                    {CONFIG.CATEGORIES.map((c) => (
                      <Link key={c.id} to={`/menu/${c.id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
                        {c.e} {name(c)}
                      </Link>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="order-last relative w-full md:order-none md:ml-auto md:w-72">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="search" value={query} aria-label={t('search')} placeholder={t('search')}
            onChange={(e) => { setQuery(e.target.value); if (pathname !== '/menu') nav('/menu') }}
            className="w-full rounded-full border border-stone-300 bg-paper py-2 pl-9 pr-4 text-sm dark:border-white/15 dark:bg-night"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button className={ib} onClick={toggleLang} aria-label="Language">{lang === 'en' ? 'हिं' : 'EN'}</button>
          <button className={ib} onClick={toggleTheme} aria-label="Theme">{theme === 'dark' ? <FiSun /> : <FiMoon />}</button>
          <Link to="/cart" className={`${ib} hidden md:inline-flex`} aria-label={t('cart')}>
            <FiShoppingCart className="text-lg" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-marigold px-1 text-xs font-bold text-stone-900">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </header>
  )
}
