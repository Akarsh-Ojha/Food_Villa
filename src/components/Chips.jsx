import { Link } from 'react-router-dom'
import { CONFIG } from '../config'
import { useApp } from '../context/AppContext'

export default function Chips({ active = '' }) {
  const { t, name } = useApp()
  const c = (on) => `flex-none rounded-full border px-4 py-2 text-sm font-medium ${on ? 'border-leaf bg-leaf text-white dark:border-green-300 dark:bg-green-300 dark:text-green-950' : 'border-stone-300 bg-white dark:border-white/15 dark:bg-nightcard'}`
  return (
    <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 py-1">
      <Link to="/menu" className={c(!active)}>{t('menu')}</Link>
      {CONFIG.CATEGORIES.map((k) => <Link key={k.id} to={`/menu/${k.id}`} className={c(active === k.id)}>{k.e} {name(k)}</Link>)}
    </div>
  )
}
