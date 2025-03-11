import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExists } from 'src/errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able register', async () => {
    const { user } = await sut.execute({
      name: 'Flávio test',
      email: 'flavio@teste.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Flávio test',
      email: 'flavio@teste.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be abla to register with same email twice', async () => {
    await sut.execute({
      name: 'Flávio test',
      email: 'flavio@teste.com',
      password: '123456',
    })

    await expect(async () => {
      await sut.execute({
        name: 'Flávio test',
        email: 'flavio@teste.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
