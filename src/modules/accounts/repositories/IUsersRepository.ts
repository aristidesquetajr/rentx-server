import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateAvatarDTO } from '../dtos/IUpdateAvatarDTO'
import { User } from '../entities/User'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  updateAvatar(data: IUpdateAvatarDTO): Promise<void>
}

export { IUsersRepository }
