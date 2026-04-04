import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Progress } from './Progress'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Progress', () => {
  it('renders with value', () => {
    renderWithMantine(<Progress value={50} />)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('renders with label', () => {
    renderWithMantine(<Progress value={75} label="Upload Progress" />)
    expect(screen.getByText('Upload Progress')).toBeInTheDocument()
  })

  it('renders with custom color', () => {
    renderWithMantine(<Progress value={30} color="green" />)
    expect(screen.getByText('30%')).toBeInTheDocument()
  })

  it('renders without label when showLabel is false', () => {
    const { container } = renderWithMantine(<Progress value={50} showLabel={false} />)
    expect(container.querySelector('.flex')).not.toBeInTheDocument()
  })

  it('renders with both label and percentage', () => {
    renderWithMantine(<Progress value={80} label="Progress" showLabel />)
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('80%')).toBeInTheDocument()
  })

  it('uses data prop value over direct value', () => {
    renderWithMantine(<Progress value={20} label="Original" data={{ value: 90, label: 'Override' }} />)
    expect(screen.getByText('Override')).toBeInTheDocument()
    expect(screen.getByText('90%')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Progress value={50} className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    renderWithMantine(<Progress value={50} id="my-progress" />)
    expect(document.getElementById('my-progress')).toBeInTheDocument()
  })

  it('renders with size prop', () => {
    renderWithMantine(<Progress value={50} size="lg" />)
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})
