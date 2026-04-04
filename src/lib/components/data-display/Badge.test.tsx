import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Badge } from './Badge'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Badge', () => {
  it('renders with label', () => {
    renderWithMantine(<Badge label="Active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders with custom color', () => {
    renderWithMantine(<Badge label="Success" color="green" />)
    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  it('renders with filled variant', () => {
    renderWithMantine(<Badge label="Filled" variant="filled" />)
    expect(screen.getByText('Filled')).toBeInTheDocument()
  })

  it('renders with outline variant', () => {
    renderWithMantine(<Badge label="Outline" variant="outline" />)
    expect(screen.getByText('Outline')).toBeInTheDocument()
  })

  it('renders with dot variant', () => {
    renderWithMantine(<Badge label="Dot" variant="dot" />)
    expect(screen.getByText('Dot')).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    sizes.forEach((size) => {
      renderWithMantine(<Badge label={size} size={size} />)
      expect(screen.getByText(size)).toBeInTheDocument()
    })
  })

  it('uses data prop label over direct label', () => {
    renderWithMantine(<Badge label="Original" data={{ label: 'Override' }} />)
    expect(screen.getByText('Override')).toBeInTheDocument()
    expect(screen.queryByText('Original')).not.toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Badge label="Test" className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    renderWithMantine(<Badge label="Test" id="my-badge" />)
    expect(screen.getByText('Test').closest('[id="my-badge"]')).toBeInTheDocument()
  })
})
