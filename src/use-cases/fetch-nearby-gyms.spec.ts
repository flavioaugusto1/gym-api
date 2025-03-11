import { GymsRepository } from 'src/repositories/gyms-respositories'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { beforeAll, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms repository', () => {
  beforeAll(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able fetch nearby gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia JavaScript',
      description: '',
      phone: '',
      latitude: -26.3535703,
      longitude: -52.8512046,
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Academia Typescript',
      description: '',
      phone: '',
      latitude: -26.2241559,
      longitude: -52.6743456,
    })

    const { gym } = await sut.execute({
      userLatitude: -26.3554062,
      userLogintude: -52.8540098,
    })

    expect(gym).toHaveLength(1)
    expect(gym).toEqual([
      expect.objectContaining({
        id: 'gym-01',
      }),
    ])
  })
})
