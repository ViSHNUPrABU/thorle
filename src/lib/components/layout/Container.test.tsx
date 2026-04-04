import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Container } from './Container'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Container', () => {
  it('renders with children', () => {
    renderWithMantine(
      <Container>
        <span>Content</span>
      </Container>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with default size', () => {
    const { container } = renderWithMantine(<Container><span>content</span></Container>)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'fluid'] as const
    sizes.forEach((size) => {
      renderWithMantine(<Container size={size}><span>{size}</span></Container>)
      expect(screen.getByText(size)).toBeInTheDocument()
    })
  })

  it('renders with padding prop', () => {
    renderWithMantine(<Container px="xl"><span>content</span></Container>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Container className="custom-class"><span>content</span></Container>)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    renderWithMantine(<Container id="my-container"><span>content</span></Container>)
    expect(screen.getByText('content').closest('[id="my-container"]')).toBeInTheDocument()
  })
})
