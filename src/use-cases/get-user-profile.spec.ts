import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from 'src/errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const createdUser = await usersRepository.create({
      name: 'Flavio',
      email: 'flavio@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Flavio')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(async () => {
      await sut.execute({
        userId: 'non-exists-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
