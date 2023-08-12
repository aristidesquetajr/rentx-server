import { prisma } from '../../../../database'
import { Specification } from '../../entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
    })

    await prisma.specification.create({
      data: specification,
    })
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await prisma.specification.findFirst({
      where: {
        name,
      },
    })

    return specification
  }
}

export { SpecificationsRepository }
