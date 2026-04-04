import { render, screen } from '@testing-library/react'
import { Data } from './Data'

describe('Data', () => {
  const mockData = { revenue: 1000, users: 50, growth: 15.5 }
  const mockFields = [
    { key: 'revenue', label: 'Revenue' },
    { key: 'users', label: 'Users' },
    { key: 'growth', label: 'Growth', format: 'percent' },
  ]

  describe('stat layout', () => {
    it('renders all fields', () => {
      render(<Data data={mockData} layout="stat" fields={mockFields} />)
      expect(screen.getByText('1000')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText('15.50%')).toBeInTheDocument()
    })

    it('renders field labels', () => {
      render(<Data data={mockData} layout="stat" fields={mockFields} />)
      expect(screen.getByText('Revenue')).toBeInTheDocument()
      expect(screen.getByText('Users')).toBeInTheDocument()
      expect(screen.getByText('Growth')).toBeInTheDocument()
    })

    it('uses key as label when label is not provided', () => {
      const fields = [{ key: 'revenue' }]
      render(<Data data={{ revenue: 100 }} layout="stat" fields={fields} />)
      expect(screen.getByText('revenue')).toBeInTheDocument()
    })

    it('formats percent values', () => {
      render(<Data data={{ val: 0.5 }} layout="stat" fields={[{ key: 'val', format: 'percent' }]} />)
      expect(screen.getByText('0.50%')).toBeInTheDocument()
    })

    it('formats bytes values', () => {
      render(<Data data={{ size: 2048 }} layout="stat" fields={[{ key: 'size', format: 'bytes' }]} />)
      expect(screen.getByText('2.00 KB')).toBeInTheDocument()
    })

    it('formats number values with locale string', () => {
      render(<Data data={{ count: 1000000 }} layout="stat" fields={[{ key: 'count', format: 'number' }]} />)
      expect(screen.getByText('1,000,000')).toBeInTheDocument()
    })

    it('formats with custom template', () => {
      render(<Data data={{ val: 42 }} layout="stat" fields={[{ key: 'val', format: '{value} items' }]} />)
      expect(screen.getByText('42 items')).toBeInTheDocument()
    })

    it('shows N/A for null values', () => {
      render(<Data data={{ val: null }} layout="stat" fields={[{ key: 'val' }]} />)
      expect(screen.getByText('N/A')).toBeInTheDocument()
    })

    it('shows N/A for undefined values', () => {
      render(<Data data={{}} layout="stat" fields={[{ key: 'missing' }]} />)
      expect(screen.getByText('N/A')).toBeInTheDocument()
    })
  })

  describe('list layout', () => {
    it('renders all fields as definition list', () => {
      render(<Data data={mockData} layout="list" fields={mockFields} />)
      expect(screen.getByText('Revenue:')).toBeInTheDocument()
      expect(screen.getByText('1000')).toBeInTheDocument()
      expect(screen.getByText('Users:')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
    })

    it('renders with formatted values', () => {
      render(<Data data={mockData} layout="list" fields={mockFields} />)
      expect(screen.getByText('15.50%')).toBeInTheDocument()
    })
  })

  describe('kpi layout', () => {
    it('renders all fields as KPI cards', () => {
      render(<Data data={mockData} layout="kpi" fields={mockFields} />)
      expect(screen.getByText('Revenue')).toBeInTheDocument()
      expect(screen.getByText('1000')).toBeInTheDocument()
      expect(screen.getByText('Users')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
    })

    it('renders with formatted values', () => {
      render(<Data data={mockData} layout="kpi" fields={mockFields} />)
      expect(screen.getByText('15.50%')).toBeInTheDocument()
    })
  })

  describe('formatValue', () => {
    it('returns string value as-is', () => {
      render(<Data data={{ name: 'test' }} layout="stat" fields={[{ key: 'name' }]} />)
      expect(screen.getByText('test')).toBeInTheDocument()
    })

    it('formats large bytes correctly', () => {
      render(<Data data={{ size: 1073741824 }} layout="stat" fields={[{ key: 'size', format: 'bytes' }]} />)
      expect(screen.getByText('1.00 GB')).toBeInTheDocument()
    })
  })
})
