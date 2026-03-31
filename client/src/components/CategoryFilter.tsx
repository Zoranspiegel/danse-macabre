'use client'

import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/lib/api'
import { useAppStore } from '@/store'

export function CategoryFilter() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const { selectedCategory, setSelectedCategory } = useAppStore()

  if (isLoading) return <div className="animate-pulse h-6 bg-gray-200 rounded"></div>

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-3 py-1 rounded-full text-sm ${
          selectedCategory === null
            ? 'bg-black text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Todos
      </button>
      {categories?.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.slug)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedCategory === category.slug
              ? 'bg-black text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
