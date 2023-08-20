import fs from 'fs'

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename)
  } catch {
    return null
  }
  await fs.promises.unlink(filename)
}
