import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from 'src/repositories/in-memory/in-memory-check-in-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Fetch User Check-in History use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
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
    })

    expect(checkIns).toEqual(2)
  })
})
