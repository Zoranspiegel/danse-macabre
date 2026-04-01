import { Test, TestingModule } from '@nestjs/testing'
import { CategoriesService } from './categories.service'
import { PrismaService } from '../prisma/prisma.service'
import { NotFoundException } from '@nestjs/common'

describe('CategoriesService', () => {
  let service: CategoriesService
  let prisma: PrismaService

  const mockCategory = {
    id: '1',
    name: 'Tarot',
    slug: 'tarot',
    description: 'Test description',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: {
            category: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile()

    service = module.get<CategoriesService>(CategoriesService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  describe('findAll', () => {
    it('should return array of categories', async () => {
      jest.spyOn(prisma.category, 'findMany').mockResolvedValue([mockCategory])

      const result = await service.findAll()

      expect(result).toEqual([mockCategory])
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        orderBy: { name: 'asc' },
      })
    })

    it('should return empty array when no categories', async () => {
      jest.spyOn(prisma.category, 'findMany').mockResolvedValue([])

      const result = await service.findAll()

      expect(result).toEqual([])
    })
  })

  describe('findOne', () => {
    it('should return category when found', async () => {
      jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(mockCategory)

      const result = await service.findOne('tarot')

      expect(result).toEqual(mockCategory)
    })

    it('should throw NotFoundException when category not found', async () => {
      jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(null)

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException)
    })

    it('should include products when includeProducts is true', async () => {
      const categoryWithProducts = {
        ...mockCategory,
        products: [],
      }
      jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(categoryWithProducts)

      const result = await service.findOne('tarot', true)

      expect(result).toEqual(categoryWithProducts)
    })
  })
})
