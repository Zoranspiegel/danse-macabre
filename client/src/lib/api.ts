import { Category, Product } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function getCategory(slug: string, includeProducts = false): Promise<Category> {
  const url = includeProducts 
    ? `${API_URL}/categories/${slug}?includeProducts=true`
    : `${API_URL}/categories/${slug}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch category')
  return res.json()
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const url = categorySlug 
    ? `${API_URL}/products?categorySlug=${categorySlug}`
    : `${API_URL}/products`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getProduct(slug: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${slug}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}
