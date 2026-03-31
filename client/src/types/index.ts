export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  imageUrl: string | null
  categoryId: string
  category: {
    id: string
    name: string
    slug: string
  }
}
