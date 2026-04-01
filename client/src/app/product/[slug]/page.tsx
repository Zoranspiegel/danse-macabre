'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getProduct } from '@/lib/api'
import Link from 'next/link'

export default function ProductPage() {
  const params = useParams()
  const slug = params?.slug as string

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug),
    enabled: !!slug,
  })

  const placeholder = '/placeholder.svg'

  if (isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-md"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Volver al catálogo
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-gray-700 mb-6 inline-block">
          ← Volver al catálogo
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
            <img
              src={product.imageUrl || placeholder}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <Link 
              href={`/?category=${product.category.slug}`}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {product.category.name}
            </Link>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold mb-6">${Number(product.price).toFixed(2)}</p>
            
            {product.description && (
              <div className="prose">
                <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
