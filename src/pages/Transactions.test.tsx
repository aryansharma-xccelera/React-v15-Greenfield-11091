import { test } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Transactions from './Transactions'

test('renders without crashing', () => {
  render(<MemoryRouter><Transactions /></MemoryRouter>)
})
