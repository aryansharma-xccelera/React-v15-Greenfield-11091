import { test } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TransactionForm from './TransactionForm'

test('renders without crashing', () => {
  render(<MemoryRouter><TransactionForm /></MemoryRouter>)
})
