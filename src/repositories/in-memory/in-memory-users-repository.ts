import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private item: User[] = []

  async findUserById(userId: string) {
    const user = this.item.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.item.push(user)

    return user
  }

  async findUserByEmail(email: string) {
    const user = this.item.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
