import { Test, TestingModule } from '@nestjs/testing'
import { ProductsService } from './products.service'
import { PrismaService } from '../prisma/prisma.service'
import { NotFoundException } from '@nestjs/common'

describe('ProductsService', () => {
  let service: ProductsService
  let prisma: PrismaService

  const mockProduct = {
    id: '1',
    name: 'Tarot Rider Waite',
    slug: 'tarot-rider-waite',
    description: 'Classic tarot deck',
    price: 24.99,
    imageUrl: null,
    categoryId: '1',
    category: {
      id: '1',
      name: 'Tarot',
      slug: 'tarot',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile()

    service = module.get<ProductsService>(ProductsService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  describe('findAll', () => {
    it('should return array of products', async () => {
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue([mockProduct])

      const result = await service.findAll()

      expect(result).toEqual([mockProduct])
    })

    it('should filter by categorySlug when provided', async () => {
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue([mockProduct])

      const result = await service.findAll('tarot')

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { category: { slug: 'tarot' } },
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
        },
        orderBy: { name: 'asc' },
      })
    })

    it('should return empty array when no products', async () => {
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue([])

      const result = await service.findAll()

      expect(result).toEqual([])
    })
  })

  describe('findOne', () => {
    it('should return product when found', async () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(mockProduct)

      const result = await service.findOne('tarot-rider-waite')

      expect(result).toEqual(mockProduct)
    })

    it('should throw NotFoundException when product not found', async () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null)

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException)
    })
  })
})
