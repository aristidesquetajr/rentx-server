import { prisma } from '../../../../database'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  async create({
    name,
    driver_licence,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      name,
      password,
      email,
      driver_licence,
    })

    await prisma.user.create({
      data: user,
    })
  }
}

export { UsersRepository }
