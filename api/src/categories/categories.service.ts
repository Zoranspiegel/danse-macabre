import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Category, Product } from '@prisma/client'

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    })
  }

  async findOne(slug: string, includeProducts = false): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: includeProducts ? { products: true } : undefined,
    })

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    return category
  }
}
