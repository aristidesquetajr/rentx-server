import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { deleteFile } from '@utils/file'

interface IRequest {
  id: string
  avatar: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, avatar }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    await this.usersRepository.updateAvatar({ id, avatar })
  }
}

export { UpdateUserAvatarUseCase }
