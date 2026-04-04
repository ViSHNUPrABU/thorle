import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Breadcrumb } from './Breadcrumb'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Breadcrumb', () => {
  const mockItems = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings' },
  ]

  it('renders all breadcrumb items', () => {
    renderWithMantine(<Breadcrumb items={mockItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders links for items with href', () => {
    renderWithMantine(<Breadcrumb items={mockItems} />)
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
    const dashboardLink = screen.getByText('Dashboard').closest('a')
    expect(dashboardLink).toHaveAttribute('href', '/dashboard')
  })

  it('renders plain text for items without href', () => {
    renderWithMantine(<Breadcrumb items={mockItems} />)
    const settingsText = screen.getByText('Settings')
    expect(settingsText.closest('a')).not.toBeInTheDocument()
  })

  it('renders with custom separator', () => {
    renderWithMantine(<Breadcrumb items={mockItems} separator=">" />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders with data prop items', () => {
    const overrideItems = [
      { label: 'Root', href: '/root' },
      { label: 'Page' },
    ]
    renderWithMantine(<Breadcrumb items={mockItems} data={{ items: overrideItems }} />)
    expect(screen.getByText('Root')).toBeInTheDocument()
    expect(screen.getByText('Page')).toBeInTheDocument()
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Breadcrumb items={mockItems} className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    const { container } = renderWithMantine(<Breadcrumb items={mockItems} id="my-breadcrumb" />)
    expect(container.querySelector('[id="my-breadcrumb"]')).toBeInTheDocument()
  })

  it('renders single item', () => {
    renderWithMantine(<Breadcrumb items={[{ label: 'Only' }]} />)
    expect(screen.getByText('Only')).toBeInTheDocument()
  })
})
