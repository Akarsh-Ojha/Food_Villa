import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import { useApp } from '../context/AppContext'
import Chips from '../components/Chips'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { t } = useApp()
  return (
    <div>
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative my-5 overflow-hidden rounded-3xl bg-leaf px-6 py-10 text-white md:px-12 md:py-14">
        <h1 className="max-w-[16ch] text-3xl font-bold leading-tight md:text-5xl">{t('h1')}</h1>
        <p className="my-3 max-w-md text-white/85">{t('hp')}</p>
        <Link to="/menu" className="inline-block rounded-xl bg-marigold px-6 py-3 font-semibold text-stone-900">{t('browse')}</Link>
        <motion.span aria-hidden animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 6, repeat: Infinity }}
          className="pointer-events-none absolute -bottom-6 -right-2 text-[9rem] leading-none opacity-20 md:text-[14rem]">🍛</motion.span>
      </motion.section>
      <Chips />
      <h2 className="mb-3 mt-7 text-xl font-semibold">{t('pop')}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {CONFIG.MENU.filter((_, i) => i % 2 === 0).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
