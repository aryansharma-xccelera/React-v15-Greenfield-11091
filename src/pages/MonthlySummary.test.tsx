import { test } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MonthlySummary from './MonthlySummary'

test('renders without crashing', () => {
  render(<MemoryRouter><MonthlySummary /></MemoryRouter>)
})
