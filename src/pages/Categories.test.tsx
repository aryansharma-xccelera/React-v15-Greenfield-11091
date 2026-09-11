import { test } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Categories } from './Categories'

test('renders without crashing', () => {
  render(<MemoryRouter><Categories /></MemoryRouter>)
})
