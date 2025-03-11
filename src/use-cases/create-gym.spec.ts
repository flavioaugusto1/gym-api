import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able register', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript gym',
      description: null,
      phone: null,
      latitude: -26.361856,
      longitude: -52.8646144,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
