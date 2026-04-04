import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Stack } from './Stack'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Stack', () => {
  it('renders with children', () => {
    renderWithMantine(
      <Stack>
        <span>Child 1</span>
        <span>Child 2</span>
      </Stack>
    )
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })

  it('renders with default column direction', () => {
    renderWithMantine(<Stack><span>content</span></Stack>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with row direction', () => {
    renderWithMantine(<Stack direction="row"><span>content</span></Stack>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with custom spacing', () => {
    renderWithMantine(<Stack spacing="xl"><span>content</span></Stack>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with align prop', () => {
    renderWithMantine(<Stack align="center"><span>content</span></Stack>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with justify prop', () => {
    renderWithMantine(<Stack justify="between"><span>content</span></Stack>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with grow prop', () => {
    renderWithMantine(<Stack grow><span>content</span></Stack>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Stack className="custom-class"><span>content</span></Stack>)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    renderWithMantine(<Stack id="my-stack"><span>content</span></Stack>)
    expect(screen.getByText('content').closest('[id="my-stack"]')).toBeInTheDocument()
  })
})
