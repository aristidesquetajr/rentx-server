import { prisma } from '../../../../database'
import { Category } from '../../entities/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
    })

    await prisma.category.create({
      data: category,
    })
  }

  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    })

    return category
  }
}

export { CategoriesRepository }
