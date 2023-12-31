import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUpdateAvatarDTO } from '../../dtos/IUpdateAvatarDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create({
    name,
    email,
    password,
    driver_licence,
  }: ICreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      name,
      email,
      password,
      driver_licence,
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)
    return user
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id)
    return user
  }

  async updateAvatar({ id, avatar }: IUpdateAvatarDTO): Promise<void> {
    const user = await this.findById(id)
    const userIndex = this.users.indexOf(user)

    this.users[userIndex].avatar = avatar
  }
}

export { UsersRepositoryInMemory }
