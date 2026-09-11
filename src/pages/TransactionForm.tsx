import React from 'react'
import { ArrowLeft, Save } from '../components/Icon'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { createTransaction, getCategories, getTransaction, updateTransaction } from '../data/store'
import { Category, TransactionInput, TransactionType } from '../types'

interface RouteParams { id?: string }
interface FormState extends TransactionInput { categories: Category[]; attempted: boolean; saving: boolean; loaded: boolean; success: string; submitError: string }

export class TransactionForm extends React.Component<RouteComponentProps<RouteParams>, FormState> {
  public state: FormState = { amount: 0, type: 'Expense', category: '', date: '', description: '', categories: [], attempted: false, saving: false, loaded: false, success: '', submitError: '' }

  public componentDidMount() {
    Promise.all([getCategories(), this.props.match.params.id ? getTransaction(this.props.match.params.id) : Promise.resolve(undefined)]).then(([categories, transaction]) => {
      if (transaction) {
        this.setState({ categories, loaded: true, amount: transaction.amount, type: transaction.type, category: transaction.category, date: transaction.date, description: transaction.description })
      } else {
        this.setState({ categories, loaded: true })
      }
    })
  }

  private updateField(field: keyof TransactionInput, value: string | number) { this.setState({ [field]: value } as Pick<FormState, keyof TransactionInput>) }
  private validDate(date: string) {
    const parsed = new Date(`${date}T00:00:00`)
    return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date
  }

  private validCategory(category: string) {
    return this.state.categories.some((item) => item.name === category)
  }

  private error(field: string) {
    if (!this.state.attempted) return ''
    if (field === 'amount' && (!this.state.amount || this.state.amount <= 0)) return 'Enter a positive amount.'
    if (field === 'category' && !this.validCategory(this.state.category)) return this.state.category ? 'Choose a valid category.' : 'Choose a category.'
    if (field === 'date' && !this.validDate(this.state.date)) return this.state.date ? 'Enter a valid date.' : 'Choose a date.'
    return ''
  }

  private submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const valid = this.state.amount > 0 && this.validCategory(this.state.category) && this.validDate(this.state.date)
    this.setState({ attempted: true, success: '', submitError: '' })
    if (!valid) return
    this.setState({ saving: true })
    const input: TransactionInput = { amount: this.state.amount, type: this.state.type, category: this.state.category, date: this.state.date, description: this.state.description.trim() }
    try {
      if (this.props.match.params.id) await updateTransaction(this.props.match.params.id, input)
      else await createTransaction(input)
      this.setState({ success: 'Transaction saved successfully.', saving: false })
      window.setTimeout(() => this.props.history.push('/transactions'), 600)
    } catch (error) {
      this.setState({ saving: false, submitError: 'Unable to save this transaction. Please try again.' })
    }
  }

  public render() {
    const editing = Boolean(this.props.match.params.id)
    if (!this.state.loaded) return <div className="animate-pulse space-y-5"><div className="h-10 w-48 rounded bg-slate-200" /><div className="h-96 rounded-card bg-slate-200" /></div>
    return <div className="mx-auto max-w-2xl"><button onClick={() => this.props.history.goBack()} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft size={17} />Back</button><h1 className="text-3xl font-bold">{editing ? 'Edit transaction' : 'Add transaction'}</h1><p className="mt-2 text-muted">Capture income and expenses as they happen.</p><form onSubmit={this.submit} className="mt-7 rounded-card border border-line bg-surface p-6 shadow-sm"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold">Type<div className="mt-2 flex rounded-xl bg-slate-100 p-1">{(['Expense', 'Income'] as TransactionType[]).map((type) => <button type="button" key={type} onClick={() => this.updateField('type', type)} className={`flex-1 rounded-lg py-2 text-sm font-semibold ${this.state.type === type ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`}>{type}</button>)}</div></label><label className="text-sm font-semibold">Amount<input type="number" min="0.01" step="0.01" value={this.state.amount || ''} onChange={(event) => this.updateField('amount', Number(event.target.value))} className="mt-2 w-full rounded-xl border border-line px-3 py-2.5 font-normal outline-none focus:border-primary" placeholder="0.00" />{this.error('amount') ? <span className="mt-1 block text-xs text-expense">{this.error('amount')}</span> : (!this.state.amount || this.state.amount <= 0) && <span className="mt-1 block text-xs font-normal text-muted">Must be greater than 0.</span>}</label><label className="text-sm font-semibold">Category<select value={this.state.category} onChange={(event) => this.updateField('category', event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-surface px-3 py-2.5 font-normal outline-none focus:border-primary"><option value="">Select a category</option>{this.state.categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}</select>{this.error('category') && <span className="mt-1 block text-xs text-expense">{this.error('category')}</span>}</label><label className="text-sm font-semibold">Date<input type="date" value={this.state.date} onInput={(event) => this.updateField('date', event.currentTarget.value)} className="mt-2 w-full rounded-xl border border-line px-3 py-2.5 font-normal outline-none focus:border-primary" />{this.error('date') && <span className="mt-1 block text-xs text-expense">{this.error('date')}</span>}</label></div><label className="mt-5 block text-sm font-semibold">Description <span className="font-normal text-muted">(optional)</span><input value={this.state.description} onChange={(event) => this.updateField('description', event.target.value)} className="mt-2 w-full rounded-xl border border-line px-3 py-2.5 font-normal outline-none focus:border-primary" placeholder="What was this for?" /></label>{this.state.success && <p className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-income">{this.state.success}</p>}{this.state.submitError && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-expense">{this.state.submitError}</p>}<div className="mt-7 flex gap-3"><button disabled={this.state.saving} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"><Save size={17} />{this.state.saving ? 'Saving...' : editing ? 'Save changes' : 'Save transaction'}</button><button type="button" onClick={() => this.props.history.push('/transactions')} className="rounded-xl border border-line px-5 py-3 text-sm font-semibold text-muted hover:bg-slate-50">Cancel</button></div></form></div>
  }
}

export default withRouter(TransactionForm)
