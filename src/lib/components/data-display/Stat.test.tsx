import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Stat } from './Stat'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Stat', () => {
  it('renders with label and value', () => {
    renderWithMantine(<Stat label="Revenue" value={1000} />)
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('1000')).toBeInTheDocument()
  })

  it('renders string value', () => {
    renderWithMantine(<Stat label="Status" value="Active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    renderWithMantine(<Stat label="Users" value={50} icon="👤" />)
    expect(screen.getByText('👤')).toBeInTheDocument()
  })

  it('renders with up trend', () => {
    renderWithMantine(<Stat label="Revenue" value={1000} trend="up" trendValue="+15%" />)
    expect(screen.getByText('↑ +15%')).toBeInTheDocument()
  })

  it('renders with down trend', () => {
    renderWithMantine(<Stat label="Revenue" value={1000} trend="down" trendValue="-5%" />)
    expect(screen.getByText('↓ -5%')).toBeInTheDocument()
  })

  it('renders with neutral trend', () => {
    renderWithMantine(<Stat label="Revenue" value={1000} trend="neutral" trendValue="0%" />)
    expect(screen.getByText('→ 0%')).toBeInTheDocument()
  })

  it('does not render trend when trendValue is missing', () => {
    const { container } = renderWithMantine(<Stat label="Revenue" value={1000} trend="up" />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('does not render trend when trend is missing', () => {
    renderWithMantine(<Stat label="Revenue" value={1000} trendValue="+15%" />)
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument()
  })

  it('uses data prop values over direct props', () => {
    renderWithMantine(
      <Stat label="Original" value={100} trend="down" trendValue="-10%" data={{ label: 'Override', value: 200, trend: 'up', trendValue: '+20%' }} />
    )
    expect(screen.getByText('Override')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument()
    expect(screen.getByText('↑ +20%')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Stat label="Test" value={1} className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    renderWithMantine(<Stat label="Test" value={1} id="my-stat" />)
    expect(document.getElementById('my-stat')).toBeInTheDocument()
  })
})
