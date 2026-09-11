import React from 'react'
import { ArrowDownRight, ArrowUpRight, Plus, Wallet } from '../components/Icon'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { getTransactions } from '../data/store'
import { Transaction } from '../types'

interface DashboardState {
  loading: boolean
  transactions: Transaction[]
}

export class Dashboard extends React.Component<RouteComponentProps, DashboardState> {
  public state: DashboardState = { loading: true, transactions: [] }

  public componentDidMount() {
    getTransactions().then((transactions) => this.setState({ transactions, loading: false }))
  }

  private currency(value: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  public render() {
    if (this.state.loading) {
      return <div className="animate-pulse space-y-6"><div className="h-10 w-56 rounded bg-slate-200" /><div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{[1, 2, 3, 4].map((number) => <div key={number} className="h-32 rounded-card bg-slate-200" />)}</div></div>
    }

    const income = this.state.transactions.filter((transaction) => transaction.type === 'Income').reduce((sum, transaction) => sum + transaction.amount, 0)
    const expenses = this.state.transactions.filter((transaction) => transaction.type === 'Expense').reduce((sum, transaction) => sum + transaction.amount, 0)
    const categories: { [name: string]: number } = {}
    this.state.transactions.filter((transaction) => transaction.type === 'Expense').forEach((transaction) => { categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount })
    const metrics = [
      { label: 'Total income', value: income, color: 'text-income', icon: ArrowUpRight },
      { label: 'Total expenses', value: expenses, color: 'text-expense', icon: ArrowDownRight },
      { label: 'Current balance', value: income - expenses, color: 'text-primary', icon: Wallet },
    ]

    return (
      <div className="space-y-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><h1 className="text-3xl font-bold tracking-tight">Overview</h1><p className="mt-2 text-muted">Your financial picture at a glance.</p></div>
          <button onClick={() => this.props.history.push('/transactions/new')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"><Plus size={18} />Add transaction</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => { const Icon = metric.icon; return <article key={metric.label} className="rounded-card border border-line bg-surface p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-medium text-muted">{metric.label}</p><Icon size={19} className={metric.color} /></div><p className={`mt-5 text-2xl font-bold ${metric.color}`}>{this.currency(metric.value)}</p></article> })}
          <article className="rounded-card border border-line bg-surface p-5 shadow-sm"><p className="text-sm font-medium text-muted">Transactions</p><p className="mt-5 text-2xl font-bold text-ink">{this.state.transactions.length}</p></article>
        </div>
        <div className="grid gap-6 xl:grid-cols-5">
          <section className="rounded-card border border-line bg-surface p-6 xl:col-span-2"><h2 className="text-lg font-bold">Spending by category</h2><div className="mt-6 space-y-4">{Object.keys(categories).length === 0 ? <p className="text-sm text-muted">No expenses recorded yet.</p> : Object.keys(categories).map((category) => <div key={category}><div className="flex justify-between text-sm"><span>{category}</span><strong>{this.currency(categories[category])}</strong></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-accent" style={{ width: `${(categories[category] / expenses) * 100}%` }} /></div></div>)}</div></section>
          <section className="rounded-card border border-line bg-surface p-6 xl:col-span-3"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">Recent transactions</h2><button onClick={() => this.props.history.push('/transactions')} className="text-sm font-semibold text-primary hover:text-blue-700">View all</button></div><div className="mt-4 divide-y divide-line">{this.state.transactions.slice().sort((left, right) => right.date.localeCompare(left.date)).slice(0, 5).map((transaction) => <button key={transaction.id} onClick={() => this.props.history.push(`/transactions/${transaction.id}/edit`)} className="flex w-full items-center justify-between py-4 text-left hover:bg-slate-50"><div><p className="font-semibold">{transaction.description || transaction.category}</p><p className="mt-1 text-sm text-muted">{transaction.category} · {transaction.date}</p></div><strong className={transaction.type === 'Income' ? 'text-income' : 'text-expense'}>{transaction.type === 'Income' ? '+' : '-'}{this.currency(transaction.amount)}</strong></button>)}</div></section>
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard)
