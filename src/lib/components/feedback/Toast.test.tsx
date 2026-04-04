import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Toast } from './Toast'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Toast', () => {
  it('renders with message', () => {
    renderWithMantine(<Toast message="Hello World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders with title', () => {
    renderWithMantine(<Toast message="Body" title="Notification" />)
    expect(screen.getByText('Notification')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('renders with different colors', () => {
    const colors = ['blue', 'green', 'red', 'yellow', 'gray'] as const
    colors.forEach((color) => {
      renderWithMantine(<Toast message={color} color={color} />)
      expect(screen.getByText(color)).toBeInTheDocument()
    })
  })

  it('renders with icon', () => {
    renderWithMantine(<Toast message="Test" icon="✓" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('renders with close button by default', () => {
    renderWithMantine(<Toast message="Test" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders without close button when disabled', () => {
    const { container } = renderWithMantine(<Toast message="Test" withCloseButton={false} />)
    expect(container.querySelector('button')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    renderWithMantine(<Toast message="Test" onClose={onClose} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('uses data prop message over direct message', () => {
    renderWithMantine(<Toast message="Original" title="Original Title" data={{ message: 'Override', title: 'Override Title' }} />)
    expect(screen.getByText('Override')).toBeInTheDocument()
    expect(screen.getByText('Override Title')).toBeInTheDocument()
    expect(screen.queryByText('Original')).not.toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Toast message="Test" className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    renderWithMantine(<Toast message="Test" id="my-toast" />)
    expect(screen.getByText('Test').closest('[id="my-toast"]')).toBeInTheDocument()
  })
})
