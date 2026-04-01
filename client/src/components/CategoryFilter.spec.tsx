import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CategoryFilter } from './CategoryFilter'
import { useAppStore } from '@/store'

// Mock the API before importing
jest.mock('@/lib/api', () => ({
  getCategories: jest.fn(),
}))

import { getCategories } from '@/lib/api'
const mockedGetCategories = getCategories as jest.MockedFunction<typeof getCategories>

// Create a wrapper component to provide QueryClient
function TestWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const mockCategories = [
  { id: '1', name: 'Tarot y Adivinación', slug: 'tarot-adivinacion', description: null },
  { id: '2', name: 'Cristales y Piedras', slug: 'cristales-piedras', description: null },
  { id: '3', name: 'Amuletos y Talismanes', slug: 'amuletos-talismanes', description: null },
]

describe('CategoryFilter', () => {
  beforeEach(() => {
    // Reset store before each test
    useAppStore.getState().setSelectedCategory(null)
    jest.clearAllMocks()
  })

  it('renders loading skeleton while fetching', () => {
    mockedGetCategories.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(
      <TestWrapper>
        <CategoryFilter />
      </TestWrapper>
    )

    // Should show loading skeleton
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('renders all categories from API', async () => {
    mockedGetCategories.mockResolvedValue(mockCategories)

    render(
      <TestWrapper>
        <CategoryFilter />
      </TestWrapper>
    )

    // Should show categories after loading
    await waitFor(() => {
      expect(screen.getByText('Tarot y Adivinación')).toBeInTheDocument()
    })
    expect(screen.getByText('Cristales y Piedras')).toBeInTheDocument()
    expect(screen.getByText('Amuletos y Talismanes')).toBeInTheDocument()
  })

  it('has Todos button selected by default', async () => {
    mockedGetCategories.mockResolvedValue(mockCategories)

    render(
      <TestWrapper>
        <CategoryFilter />
      </TestWrapper>
    )

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Tarot y Adivinación')).toBeInTheDocument()
    })

    const todosButton = screen.getByText('Todos')
    expect(todosButton).toHaveClass('bg-black', 'text-white')
  })

  it('calls setSelectedCategory when clicking a category', async () => {
    mockedGetCategories.mockResolvedValue(mockCategories)
    const setSelectedCategory = jest.spyOn(useAppStore.getState(), 'setSelectedCategory')

    render(
      <TestWrapper>
        <CategoryFilter />
      </TestWrapper>
    )

    const categoryButton = await screen.findByText('Tarot y Adivinación')
    fireEvent.click(categoryButton)

    expect(setSelectedCategory).toHaveBeenCalledWith('tarot-adivinacion')
  })

  it('calls setSelectedCategory(null) when clicking Todos', async () => {
    mockedGetCategories.mockResolvedValue(mockCategories)
    const setSelectedCategory = jest.spyOn(useAppStore.getState(), 'setSelectedCategory')

    render(
      <TestWrapper>
        <CategoryFilter />
      </TestWrapper>
    )

    // First select a category
    const categoryButton = await screen.findByText('Tarot y Adivinación')
    fireEvent.click(categoryButton)
    expect(setSelectedCategory).toHaveBeenCalledWith('tarot-adivinacion')

    // Then click Todos
    const todosButton = screen.getByText('Todos')
    fireEvent.click(todosButton)

    expect(setSelectedCategory).toHaveBeenCalledWith(null)
  })
})
