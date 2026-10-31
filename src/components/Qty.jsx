import { FiMinus, FiPlus } from 'react-icons/fi'
import { useApp } from '../context/AppContext'

export default function Qty({ id, className = '' }) {
  const { cart, inc, dec } = useApp()
  const b = 'flex h-9 w-9 items-center justify-center hover:bg-black/5 dark:hover:bg-white/10'
  return (
    <div className={`inline-flex items-center justify-between overflow-hidden rounded-xl border border-stone-300 dark:border-white/15 ${className}`}>
      <button className={b} onClick={() => dec(id)} aria-label="−"><FiMinus /></button>
      <span className="min-w-8 text-center text-sm font-semibold">{cart[id]}</span>
      <button className={b} onClick={() => inc(id)} aria-label="+"><FiPlus /></button>
    </div>
  )
}
