import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Button } from './Button'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Button', () => {
  it('renders with label', () => {
    renderWithMantine(<Button label="Click Me" />)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const variants = ['filled', 'light', 'outline', 'subtle', 'white'] as const
    variants.forEach((variant) => {
      renderWithMantine(<Button label={variant} variant={variant} />)
      expect(screen.getByText(variant)).toBeInTheDocument()
    })
  })

  it('renders with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    sizes.forEach((size) => {
      renderWithMantine(<Button label={size} size={size} />)
      expect(screen.getByText(size)).toBeInTheDocument()
    })
  })

  it('renders with custom color', () => {
    renderWithMantine(<Button label="Red" color="red" />)
    expect(screen.getByText('Red')).toBeInTheDocument()
  })

  it('renders as disabled', () => {
    renderWithMantine(<Button label="Disabled" disabled />)
    expect(screen.getByRole('button', { name: /Disabled/i })).toBeDisabled()
  })

  it('renders in loading state', () => {
    renderWithMantine(<Button label="Loading" loading />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('renders with fullWidth', () => {
    renderWithMantine(<Button label="Full" fullWidth />)
    expect(screen.getByText('Full')).toBeInTheDocument()
  })

  it('renders with left icon', () => {
    renderWithMantine(<Button label="Submit" leftIcon="📤" />)
    expect(screen.getByText('📤')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('renders with right icon', () => {
    renderWithMantine(<Button label="Next" rightIcon="→" />)
    expect(screen.getByText('→')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    renderWithMantine(<Button label="Click" onClick={onClick} />)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onAction when clicked', () => {
    const onAction = vi.fn()
    renderWithMantine(<Button label="Click" id="btn-1" onAction={onAction} />)
    fireEvent.click(screen.getByText('Click'))
    expect(onAction).toHaveBeenCalledWith({
      type: 'custom',
      trigger: 'click',
      payload: { action: 'button-click', id: 'btn-1' },
    })
  })

  it('calls both onClick and onAction when clicked', () => {
    const onClick = vi.fn()
    const onAction = vi.fn()
    renderWithMantine(<Button label="Click" onClick={onClick} onAction={onAction} />)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('uses data prop label over direct label', () => {
    renderWithMantine(<Button label="Original" data={{ label: 'Override' }} />)
    expect(screen.getByText('Override')).toBeInTheDocument()
    expect(screen.queryByText('Original')).not.toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Button label="Test" className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    const { container } = renderWithMantine(<Button label="Test" id="my-btn" />)
    expect(container.querySelector('[id="my-btn"]')).toBeInTheDocument()
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    renderWithMantine(<Button label="Disabled" disabled onClick={onClick} />)
    fireEvent.click(screen.getByText('Disabled'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
