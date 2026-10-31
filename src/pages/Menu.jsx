import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CONFIG } from '../config'
import { useApp } from '../context/AppContext'
import Chips from '../components/Chips'
import ProductCard from '../components/ProductCard'

export default function Menu() {
  const { cat = '' } = useParams()
  const { t, name, query } = useApp()
  const q = query.trim().toLowerCase()
  const list = CONFIG.MENU.filter((m) => (!cat || m.cat === cat) && (!q || m.en.toLowerCase().includes(q) || m.hi.includes(q)))
  const current = CONFIG.CATEGORIES.find((c) => c.id === cat)
  return (
    <div className="pt-4">
      <h1 className="mb-3 text-xl font-semibold">{current ? name(current) : t('menu')}</h1>
      <Chips active={cat} />
      {list.length ? (
        <motion.div layout className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">{list.map((p) => <ProductCard key={p.id} p={p} />)}</AnimatePresence>
        </motion.div>
      ) : (
        <p className="py-16 text-center text-stone-500"><span className="block text-5xl">🔍</span>{t('none')}</p>
      )}
    </div>
  )
}
