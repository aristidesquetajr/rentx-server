import { parse } from 'csv-parse'
import fs from 'fs'

class ImportCategoryUseCase {
  execute(file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path)

    const fileParse = parse()

    stream.pipe(fileParse)

    fileParse.on("data", async (file) => {
      console.log(file)
    })

  }
}

export { ImportCategoryUseCase }
