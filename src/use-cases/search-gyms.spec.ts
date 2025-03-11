import { GymsRepository } from 'src/repositories/gyms-respositories'
import { beforeAll, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: GymsRepository
let sut: SearchGymsUseCase

describe('Fetch nearby gyms repository', () => {
  beforeAll(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able search a gym by name', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia JavaScript',
      description: '',
      phone: '',
      latitude: -26.3535703,
      longitude: -52.8512046,
    })

    const { gym } = await sut.execute({
      title: 'Academia JavaScript',
      page: 1,
    })

    expect(gym).toHaveLength(1)
    expect(gym).toEqual([
      expect.objectContaining({
        id: 'gym-01',
      }),
    ])
  })
})
