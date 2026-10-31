import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { FiTrash2, FiX } from 'react-icons/fi'
import { useApp } from '../context/AppContext'
import { buildMessage, byId, money, pic, sendWhatsApp } from '../utils'
import Qty from '../components/Qty'

export default function Cart() {
  const { t, name, cart, count, totals, remove, clear, notify } = useApp()
  const nav = useNavigate()
  const ids = Object.keys(cart)

  const order = () => {
    if (!count) { notify(t('et')); nav('/menu'); return } // validate
    if (sendWhatsApp(buildMessage(cart, t, name)) === 'config') notify(t('setup'))
  }

  if (!ids.length)
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="mt-3 text-xl font-semibold">{t('et')}</h1>
        <p className="mb-6 mt-1 text-stone-500">{t('es')}</p>
        <Link to="/menu" className="rounded-xl bg-marigold px-6 py-3 font-semibold text-stone-900">{t('browse')}</Link>
      </motion.div>
    )

  const ghost = 'flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-300 px-4 py-3 text-sm font-medium dark:border-white/15'
  return (
    <div className="mx-auto max-w-2xl pt-4">
      <h1 className="mb-3 text-xl font-semibold">{t('yc')}</h1>
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {ids.map((id) => {
            const p = byId[id], q = cart[id]
            return (
              <motion.div key={id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
                className="flex gap-3 rounded-2xl bg-white p-2.5 shadow-sm dark:bg-nightcard">
                <img src={pic(p)} alt={name(p)} className="h-24 w-24 flex-none rounded-xl object-cover" />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold leading-snug">{name(p)}</h3>
                    <button onClick={() => remove(id)} aria-label={t('rm')} className="rounded-full p-1.5 text-red-600 hover:bg-red-500/10"><FiX /></button>
                  </div>
                  <div className="flex items-baseline gap-2 text-sm">
                    <b>{money(p.price)}</b>{p.mrp > p.price && <s className="text-xs text-stone-500">{money(p.mrp)}</s>}
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <Qty id={id} />
                    <b>{money(p.price * q)}</b>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <motion.div layout className="mt-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-nightcard">
        <div className="flex justify-between py-1"><span>{t('sub')}</span><span>{money(totals.sub)}</span></div>
        <div className="flex justify-between py-1 font-medium text-green-600 dark:text-green-400"><span>{t('disc')}</span><span>− {money(totals.disc)}</span></div>
        <div className="mt-2 flex justify-between border-t border-dashed border-stone-300 pt-3 text-xl font-bold dark:border-white/20"><span>{t('fin')}</span><span>{money(totals.fin)}</span></div>
      </motion.div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={order}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-wa py-4 text-lg font-semibold text-white shadow-lg shadow-green-600/25">
        <FaWhatsapp className="text-2xl" /> {t('order')}
      </motion.button>
      <div className="mt-3 flex gap-3">
        <Link to="/menu" className={ghost}>{t('cont')}</Link>
        <button className={ghost} onClick={() => confirm(t('ask')) && clear()}><FiTrash2 /> {t('clear')}</button>
      </div>
    </div>
  )
}
