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

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    return user
  }
}

export { UsersRepository }
