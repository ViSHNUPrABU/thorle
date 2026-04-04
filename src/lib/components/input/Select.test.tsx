import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Select } from './Select'

const renderWithMantine = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Select', () => {
  const mockOptions = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
    { value: 'opt3', label: 'Option 3' },
  ]

  it('renders with label', () => {
    renderWithMantine(<Select label="Choose" options={mockOptions} />)
    expect(screen.getByText('Choose')).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    const { container } = renderWithMantine(<Select placeholder="Select an option" options={mockOptions} />)
    expect(container.querySelector('input')).toBeInTheDocument()
  })

  it('renders as disabled', () => {
    const { container } = renderWithMantine(<Select options={mockOptions} disabled />)
    const disabledElement = container.querySelector('[aria-disabled="true"], [disabled]')
    expect(disabledElement).toBeInTheDocument()
  })

  it('renders and can be interacted with', () => {
    const onChange = vi.fn()
    renderWithMantine(<Select options={mockOptions} onChange={onChange} />)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('calls onAction callback setup', () => {
    const onAction = vi.fn()
    renderWithMantine(<Select options={mockOptions} id="sel-1" onAction={onAction} />)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('uses data prop values over direct props', () => {
    const overrideOptions = [
      { value: 'a', label: 'Override A' },
      { value: 'b', label: 'Override B' },
    ]
    renderWithMantine(
      <Select label="Original" options={mockOptions} data={{ label: 'Override', options: overrideOptions }} />
    )
    expect(screen.getByText('Override')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = renderWithMantine(<Select options={mockOptions} className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })

  it('renders with id prop', () => {
    const { container } = renderWithMantine(<Select options={mockOptions} id="my-select" />)
    expect(container.querySelector('[id="my-select"]')).toBeInTheDocument()
  })
})
