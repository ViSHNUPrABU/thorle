import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Tabs } from './Tabs'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Tabs', () => {
  const mockTabs = [
    { label: 'Tab 1', value: 'tab-1', content: <span>Content 1</span> },
    { label: 'Tab 2', value: 'tab-2', content: <span>Content 2</span> },
    { label: 'Tab 3', value: 'tab-3', content: <span>Content 3</span> },
  ]

  it('renders all tab labels', () => {
    renderWithMantine(<Tabs tabs={mockTabs} />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
  })

  it('renders first tab content by default', () => {
    renderWithMantine(<Tabs tabs={mockTabs} />)
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('renders with default value', () => {
    renderWithMantine(<Tabs tabs={mockTabs} defaultValue="tab-2" />)
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('switches tabs on click', () => {
    renderWithMantine(<Tabs tabs={mockTabs} />)
    fireEvent.click(screen.getByText('Tab 2'))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('renders with vertical orientation', () => {
    renderWithMantine(<Tabs tabs={mockTabs} orientation="vertical" />)
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Tabs tabs={mockTabs} className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    renderWithMantine(<Tabs tabs={mockTabs} id="my-tabs" />)
    expect(screen.getByText('Tab 1').closest('[id="my-tabs"]')).toBeInTheDocument()
  })

  it('renders fallback children when tab has no content', () => {
    const tabsWithoutContent = [
      { label: 'Tab A', value: 'a' },
    ]
    renderWithMantine(
      <Tabs tabs={tabsWithoutContent as any}>
        <span>Fallback Content</span>
      </Tabs>
    )
    expect(screen.getByText('Fallback Content')).toBeInTheDocument()
  })
})
