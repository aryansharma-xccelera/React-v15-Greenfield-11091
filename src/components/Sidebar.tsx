import React from 'react'
import { NavLink } from 'react-router-dom'
import { Chart, LayoutDashboard, ReceiptText, Tags } from './Icon'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Transactions', to: '/transactions', icon: ReceiptText },
  { label: 'Categories', to: '/categories', icon: Tags },
  { label: 'Monthly summary', to: '/monthly-summary', icon: Chart },
]

export class Sidebar extends React.Component {
  public render() {
    return (
      <aside className="w-full border-b border-line bg-surface px-5 py-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
        <NavLink to="/dashboard" className="mb-7 flex items-center gap-3 text-xl font-bold tracking-tight text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg text-white">$</span>
          Spendly
        </NavLink>
        <nav className="flex gap-2 overflow-x-auto lg:flex-col">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                activeClassName="bg-blue-50 text-primary"
                className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-slate-50 hover:text-ink"
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </aside>
    )
  }
}
