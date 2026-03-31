import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholder = '/placeholder.svg'

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="aspect-square bg-gray-100 rounded-md mb-3 overflow-hidden">
        <img
          src={product.imageUrl || placeholder}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
      <p className="font-bold">${Number(product.price).toFixed(2)}</p>
    </Link>
  )
}
