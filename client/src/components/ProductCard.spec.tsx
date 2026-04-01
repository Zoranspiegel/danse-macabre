import { render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import { Product } from '@/types'

const mockProduct: Product = {
  id: '1',
  name: 'Tarot Rider Waite',
  slug: 'tarot-rider-waite',
  description: 'El tarot Rider Waite clásico con guía incluido',
  price: 24.99,
  imageUrl: null,
  categoryId: '1',
  category: {
    id: '1',
    name: 'Tarot y Adivinación',
    slug: 'tarot-adivinacion',
  },
}

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Tarot Rider Waite')).toBeInTheDocument()
  })

  it('renders product price formatted', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$24.99')).toBeInTheDocument()
  })

  it('renders category name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Tarot y Adivinación')).toBeInTheDocument()
  })

  it('links to product detail page', () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/product/tarot-rider-waite')
  })

  it('shows placeholder image when no imageUrl', () => {
    render(<ProductCard product={mockProduct} />)
    const img = screen.getByAltText('Tarot Rider Waite')
    expect(img).toHaveAttribute('src', '/placeholder.svg')
  })

  it('shows custom image when imageUrl provided', () => {
    const productWithImage = {
      ...mockProduct,
      imageUrl: '/custom-image.jpg',
    }
    render(<ProductCard product={productWithImage} />)
    const img = screen.getByAltText('Tarot Rider Waite')
    expect(img).toHaveAttribute('src', '/custom-image.jpg')
  })
})
