import { render, screen } from '@testing-library/react'
import { Empty } from './Empty'

describe('Empty', () => {
  it('renders with default message and description', () => {
    render(<Empty />)
    expect(screen.getByText('No Data')).toBeInTheDocument()
    expect(screen.getByText('No data available to display')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<Empty message="Nothing here" />)
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('renders with custom description', () => {
    render(<Empty description="Try adjusting your filters" />)
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument()
  })

  it('renders with both custom message and description', () => {
    render(<Empty message="Empty" description="No results" />)
    expect(screen.getByText('Empty')).toBeInTheDocument()
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('applies correct layout styles', () => {
    const { container } = render(<Empty />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({ display: 'flex', flexDirection: 'column', alignItems: 'center' })
  })
})
