import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGrid, FiHome, FiShoppingCart } from 'react-icons/fi'
import { useApp } from '../context/AppContext'

const items = [
  { to: '/', icon: FiHome, k: 'home', end: true },
  { to: '/menu', icon: FiGrid, k: 'menu', end: false },
  { to: '/cart', icon: FiShoppingCart, k: 'cart', end: true },
]

export default function BottomNav() {
  const { t, count } = useApp()
  return (
    <nav aria-label="Mobile" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-stone-200 bg-white dark:border-white/10 dark:bg-nightcard md:hidden">
      {items.map(({ to, icon: Icon, k, end }) => (
        <NavLink key={k} to={to} end={end} className={({ isActive }) => `relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium ${isActive ? 'text-leaf dark:text-green-300' : 'text-stone-500'}`}>
          {({ isActive }) => (
            <>
              {isActive && <motion.span layoutId="tab" className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-leaf dark:bg-green-300" />}
              <span className="relative">
                <Icon className="text-xl" />
                {k === 'cart' && count > 0 && (
                  <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }}
                    className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-marigold px-1 text-[10px] font-bold text-stone-900">{count}</motion.span>
                )}
              </span>
              {t(k)}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
