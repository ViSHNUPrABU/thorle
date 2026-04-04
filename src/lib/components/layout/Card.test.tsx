import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Card } from './Card'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Card', () => {
  it('renders with children', () => {
    renderWithMantine(
      <Card>
        <span>Card Content</span>
      </Card>
    )
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('renders with title', () => {
    renderWithMantine(<Card title="My Card"><span>content</span></Card>)
    expect(screen.getByText('My Card')).toBeInTheDocument()
  })

  it('renders with subtitle', () => {
    renderWithMantine(<Card subtitle="Card subtitle"><span>content</span></Card>)
    expect(screen.getByText('Card subtitle')).toBeInTheDocument()
  })

  it('renders with both title and subtitle', () => {
    renderWithMantine(<Card title="Title" subtitle="Subtitle"><span>content</span></Card>)
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
  })

  it('does not render header section without title or subtitle', () => {
    const { container } = renderWithMantine(<Card><span>content</span></Card>)
    expect(container.querySelector('h4')).not.toBeInTheDocument()
  })

  it('renders with custom shadow', () => {
    renderWithMantine(<Card shadow="lg"><span>content</span></Card>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with custom padding', () => {
    renderWithMantine(<Card padding="xl"><span>content</span></Card>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with border disabled', () => {
    renderWithMantine(<Card withBorder={false}><span>content</span></Card>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Card className="custom-class"><span>content</span></Card>)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    renderWithMantine(<Card id="my-card"><span>content</span></Card>)
    expect(screen.getByText('content').closest('[id="my-card"]')).toBeInTheDocument()
  })
})
