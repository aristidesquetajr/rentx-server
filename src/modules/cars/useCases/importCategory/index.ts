import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import { ImportCategoryController } from './ImportCategoryController'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

export default (): ImportCategoryController => {
  const categoryRepository = new CategoriesRepository()
  const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository)

  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase,
  )
  return importCategoryController
}
