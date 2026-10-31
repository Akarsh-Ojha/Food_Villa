import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import { useApp } from '../context/AppContext'
import { money, pic } from '../utils'
import Qty from './Qty'

export default function ProductCard({ p }) {
  const { t, name, cart, add } = useApp()
  const pct = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0
  return (
    <motion.article layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} whileHover={{ y: -3 }}
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-nightcard">
      <div className="relative aspect-[5/4] overflow-hidden bg-paper">
        <img src={pic(p)} alt={name(p)} loading="lazy" className="h-full w-full object-cover" />
        {pct > 0 && <span className="absolute left-2 top-2 rounded-full bg-marigold px-2 py-0.5 text-xs font-bold text-stone-900">{pct}% {t('off')}</span>}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="text-sm font-semibold leading-snug">{name(p)}</h3>
        <div className="flex items-baseline gap-2">
          <b>{money(p.price)}</b>
          {pct > 0 && <s className="text-xs text-stone-500">{money(p.mrp)}</s>}
        </div>
        <div className="mt-auto pt-1">
          {cart[p.id] ? (
            <Qty id={p.id} className="w-full" />
          ) : (
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => add(p.id)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-leaf py-2 text-sm font-semibold text-white dark:bg-green-300 dark:text-green-950">
              <FiPlus /> {t('add')}
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
