import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Logo from './Logo.jsx'

describe('Logo', () => {
  it('renders accessible name "Destrava"', () => {
    const { getByRole, getByText } = render(<Logo variant="horizontal" />)
    expect(getByRole('img', { name: 'Destrava' })).toBeInTheDocument()
    expect(getByText('destrava')).toBeInTheDocument()
  })

  it('mark variant has no wordmark', () => {
    const { queryByText } = render(<Logo variant="mark" />)
    expect(queryByText('destrava')).toBeNull()
  })
})
