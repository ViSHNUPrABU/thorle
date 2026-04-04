import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Grid } from './Grid'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Grid', () => {
  it('renders with children', () => {
    renderWithMantine(
      <Grid>
        <span>Item 1</span>
        <span>Item 2</span>
      </Grid>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders with default columns', () => {
    renderWithMantine(<Grid><span>content</span></Grid>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with custom column count', () => {
    renderWithMantine(<Grid cols={4}><span>content</span></Grid>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with custom spacing', () => {
    renderWithMantine(<Grid spacing="xl"><span>content</span></Grid>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with breakpoints', () => {
    const breakpoints = [
      { maxWidth: 768, cols: 2 },
      { maxWidth: 480, cols: 1 },
    ]
    renderWithMantine(<Grid breakpoints={breakpoints}><span>content</span></Grid>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Grid className="custom-class"><span>content</span></Grid>)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    renderWithMantine(<Grid id="my-grid"><span>content</span></Grid>)
    expect(screen.getByText('content').closest('[id="my-grid"]')).toBeInTheDocument()
  })
})
