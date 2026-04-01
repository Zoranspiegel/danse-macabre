import { Controller, Get, Param, Query } from '@nestjs/common'
import { CategoriesService } from './categories.service'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':slug')
  findOne(
    @Param('slug') slug: string,
    @Query('includeProducts') includeProducts: string,
  ) {
    const include = includeProducts === 'true'
    return this.categoriesService.findOne(slug, include)
  }
}
