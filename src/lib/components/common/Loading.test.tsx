import { render, screen } from '@testing-library/react'
import { Loading } from './Loading'

describe('Loading', () => {
  it('renders with default message', () => {
    render(<Loading />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<Loading message="Fetching data..." />)
    expect(screen.getByText('Fetching data...')).toBeInTheDocument()
  })

  it('renders spinner element', () => {
    const { container } = render(<Loading />)
    const spinner = container.firstChild?.querySelector('div > div')
    expect(spinner).toBeInTheDocument()
  })

  it('applies correct layout styles', () => {
    const { container } = render(<Loading />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' })
  })
})
