export type TransactionType = 'Income' | 'Expense'

export interface Transaction {
  id: string
  amount: number
  type: TransactionType
  category: string
  date: string
  description: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  isCustom: boolean
}

export interface TransactionInput {
  amount: number
  type: TransactionType
  category: string
  date: string
  description: string
}
