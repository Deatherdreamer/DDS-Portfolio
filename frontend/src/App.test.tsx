import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the portfolio heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /dds portfolio/i })).toBeInTheDocument()
  })
})
