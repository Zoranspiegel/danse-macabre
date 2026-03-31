import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Product } from '@prisma/client'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(categorySlug?: string): Promise<Product[]> {
    const where = categorySlug
      ? { category: { slug: categorySlug } }
      : {}

    return this.prisma.product.findMany({
      where,
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { name: 'asc' },
    })
  }

  async findOne(slug: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return product
  }
}
