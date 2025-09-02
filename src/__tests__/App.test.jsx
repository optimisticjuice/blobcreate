import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App.jsx'

describe('App', () => {
  it('renders the header and interactive controls', () => {
    render(<App />)
    // Header contains dynamic letter; match the static part
    expect(screen.getByText(/Random Letter of the Header/i)).toBeInTheDocument()
    // Buttons present
    expect(screen.getByRole('button', { name: /Increment/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Decrement/i })).toBeInTheDocument()
  })
})

