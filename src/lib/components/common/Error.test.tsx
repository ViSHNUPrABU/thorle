import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorDisplay } from './Error'

describe('ErrorDisplay', () => {
  it('renders with default message', () => {
    render(<ErrorDisplay />)
    expect(screen.getByText('An error occurred')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<ErrorDisplay message="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('displays Error object message', () => {
    const err = new Error('Network error')
    render(<ErrorDisplay error={err} />)
    expect(screen.getByText('Network error')).toBeInTheDocument()
  })

  it('displays string error', () => {
    render(<ErrorDisplay error="Connection refused" />)
    expect(screen.getByText('Connection refused')).toBeInTheDocument()
  })

  it('prioritizes error prop over message prop', () => {
    const err = new Error('Real error')
    render(<ErrorDisplay error={err} message="Fallback" />)
    expect(screen.getByText('Real error')).toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    render(<ErrorDisplay onRetry={() => {}} />)
    expect(screen.getByText('Retry')).toBeInTheDocument()
  })

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorDisplay />)
    expect(screen.queryByText('Retry')).not.toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn()
    render(<ErrorDisplay onRetry={onRetry} />)
    fireEvent.click(screen.getByText('Retry'))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renders error heading', () => {
    render(<ErrorDisplay />)
    expect(screen.getByText('Error')).toBeInTheDocument()
  })
})
