import { render, screen } from '@testing-library/react'

import { Board } from './Board'

describe('Board', () => {
  it('renders', () => {
    render(<Board />)

    expect(screen.getByText('Add New Card')).toBeInTheDocument()
  })
})
