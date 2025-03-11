import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from 'src/repositories/in-memory/in-memory-check-in-repository'
import { FetchUserCheckInsHitoryUseCase } from './fetch-user-history-check-ins'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHitoryUseCase

describe('Fetch User Check-in History use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHitoryUseCase(checkInRepository)

    // await gymsRepository.create({
    //   id: 'gym-01',
    //   title: 'Node gym',
    //   description: '',
    //   latitude: -26.361856,
    //   longitude: -52.8646144,
    //   phone: '',
    // })
  })

  it('should be able to fetch paginated check-in history', async () => {
    await checkInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    await checkInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
