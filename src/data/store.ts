import apiClient from '../api/client'
import { predefinedCategories, mockTransactions } from './mockData'
import { Category, Transaction, TransactionInput } from '../types'

export const USE_MOCK = true

function loadTransactions(): Transaction[] {
  const raw = localStorage.getItem('expense_transactions')
  if (raw) return JSON.parse(raw) as Transaction[]
  localStorage.setItem('expense_transactions', JSON.stringify(mockTransactions))
  return mockTransactions
}

function localGetTransactions(): Transaction[] {
  return loadTransactions()
}

function localGetTransaction(id: string): Transaction | undefined {
  return loadTransactions().find((transaction) => transaction.id === id)
}

function localCreateTransaction(input: TransactionInput): Transaction {
  const transaction: Transaction = {
    ...input,
    id: `transaction-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  const transactions = loadTransactions()
  transactions.unshift(transaction)
  localStorage.setItem('expense_transactions', JSON.stringify(transactions))
  return transaction
}

function localUpdateTransaction(id: string, input: TransactionInput): Transaction | undefined {
  const transactions = loadTransactions()
  const index = transactions.findIndex((transaction) => transaction.id === id)
  if (index === -1) return undefined
  transactions[index] = { ...transactions[index], ...input }
  localStorage.setItem('expense_transactions', JSON.stringify(transactions))
  return transactions[index]
}

function localDeleteTransaction(id: string): void {
  const transactions = loadTransactions().filter((transaction) => transaction.id !== id)
  localStorage.setItem('expense_transactions', JSON.stringify(transactions))
}

function loadCategories(): Category[] {
  const raw = localStorage.getItem('expense_custom_categories')
  if (raw) return JSON.parse(raw) as Category[]
  localStorage.setItem('expense_custom_categories', JSON.stringify([]))
  return []
}

function localGetCategories(): Category[] {
  return [...predefinedCategories, ...loadCategories()]
}

function localCreateCategory(name: string): Category {
  const category: Category = { id: `category-${Date.now()}`, name, isCustom: true }
  const categories = loadCategories()
  categories.push(category)
  localStorage.setItem('expense_custom_categories', JSON.stringify(categories))
  return category
}

function localDeleteCategory(id: string): void {
  const categories = loadCategories().filter((category) => category.id !== id)
  localStorage.setItem('expense_custom_categories', JSON.stringify(categories))
}

// TODO(USE_MOCK): verify paths and response shapes before switching to the API.
export async function getTransactions(): Promise<Transaction[]> {
  if (USE_MOCK) return localGetTransactions()
  const response = await apiClient.get('/api/v1/transactions')
  return response.data
}

export async function getTransaction(id: string): Promise<Transaction | undefined> {
  if (USE_MOCK) return localGetTransaction(id)
  const response = await apiClient.get(`/api/v1/transactions/${id}`)
  return response.data
}

export async function createTransaction(input: TransactionInput): Promise<Transaction> {
  if (USE_MOCK) return localCreateTransaction(input)
  const response = await apiClient.post('/api/v1/transactions', input)
  return response.data
}

export async function updateTransaction(id: string, input: TransactionInput): Promise<Transaction | undefined> {
  if (USE_MOCK) return localUpdateTransaction(id, input)
  const response = await apiClient.put(`/api/v1/transactions/${id}`, input)
  return response.data
}

export async function deleteTransaction(id: string): Promise<void> {
  if (USE_MOCK) return localDeleteTransaction(id)
  await apiClient.delete(`/api/v1/transactions/${id}`)
}

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK) return localGetCategories()
  const response = await apiClient.get('/api/v1/categories')
  return response.data
}

export async function createCategory(name: string): Promise<Category> {
  if (USE_MOCK) return localCreateCategory(name)
  const response = await apiClient.post('/api/v1/categories', { name })
  return response.data
}

export async function deleteCategory(id: string): Promise<void> {
  if (USE_MOCK) return localDeleteCategory(id)
  await apiClient.delete(`/api/v1/categories/${id}`)
}
