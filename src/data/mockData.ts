import { Category, Transaction } from '../types'

export const predefinedCategories: Category[] = [
  { id: 'food', name: 'Food', isCustom: false },
  { id: 'travel', name: 'Travel', isCustom: false },
  { id: 'shopping', name: 'Shopping', isCustom: false },
  { id: 'bills', name: 'Bills', isCustom: false },
  { id: 'health', name: 'Health', isCustom: false },
  { id: 'entertainment', name: 'Entertainment', isCustom: false },
  { id: 'other', name: 'Other', isCustom: false },
]

export const mockTransactions: Transaction[] = [
  { id: 't1', amount: 4200, type: 'Income', category: 'Salary', date: '2026-09-01', description: 'September salary', createdAt: '2026-09-01T08:00:00.000Z' },
  { id: 't2', amount: 62.5, type: 'Expense', category: 'Food', date: '2026-09-09', description: 'Weekly groceries', createdAt: '2026-09-09T10:30:00.000Z' },
  { id: 't3', amount: 38, type: 'Expense', category: 'Travel', date: '2026-09-08', description: 'Train pass', createdAt: '2026-09-08T09:00:00.000Z' },
  { id: 't4', amount: 120, type: 'Expense', category: 'Bills', date: '2026-09-05', description: 'Internet bill', createdAt: '2026-09-05T12:00:00.000Z' },
  { id: 't5', amount: 250, type: 'Income', category: 'Freelance', date: '2026-08-26', description: 'Design project', createdAt: '2026-08-26T14:00:00.000Z' },
  { id: 't6', amount: 84, type: 'Expense', category: 'Shopping', date: '2026-08-22', description: 'Office supplies', createdAt: '2026-08-22T16:00:00.000Z' },
  { id: 't7', amount: 45, type: 'Expense', category: 'Entertainment', date: '2026-08-17', description: 'Concert tickets', createdAt: '2026-08-17T19:00:00.000Z' },
  { id: 't8', amount: 28, type: 'Expense', category: 'Health', date: '2026-08-12', description: 'Pharmacy', createdAt: '2026-08-12T11:00:00.000Z' },
  { id: 't9', amount: 18, type: 'Expense', category: 'Food', date: '2026-08-09', description: 'Coffee with a friend', createdAt: '2026-08-09T08:00:00.000Z' },
  { id: 't10', amount: 4100, type: 'Income', category: 'Salary', date: '2026-08-01', description: 'August salary', createdAt: '2026-08-01T08:00:00.000Z' },
]
