import { parse } from 'csv-parse'
import fs from 'fs'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}
class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) { }

  loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const fileParse = parse()

      stream.pipe(fileParse)

      fileParse
        .on("data", async (line) => {
          const [name, description] = line

          categories.push({
            name,
            description
          })
        })
        .on("end", () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on("error", (err) => {
          fs.promises.unlink(file.path)
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file)

    categories.map(async (category) => {
      const { name, description } = category

      const existCategory = this.categoryRepository.findByName(name)

      if(!existCategory) {
        this.categoryRepository.create({
          name,
          description
        })
      }
    })
  }
}

export { ImportCategoryUseCase }
