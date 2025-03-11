import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from 'src/repositories/in-memory/in-memory-check-in-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumbersCheckinsError } from 'src/errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from 'src/errors/max-distance-error'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Checkin use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Node gym',
      description: '',
      latitude: -26.361856,
      longitude: -52.8646144,
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -26.361856,
      userLongitude: -52.8646144,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -26.361856,
      userLongitude: -52.8646144,
    })

    expect(async () => {
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -26.361856,
        userLongitude: -52.8646144,
      })
    }).rejects.toBeInstanceOf(MaxNumbersCheckinsError)
  })

  it('should be able to check in twice but on diferent days', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -26.361856,
      userLongitude: -52.8646144,
    })

    vi.setSystemTime(new Date(2025, 0, 2, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -26.361856,
      userLongitude: -52.8646144,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able checkin in distant gym', async () => {
    gymsRepository.item.push({
      id: 'gym-01',
      title: 'Node gym',
      description: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '',
    })

    expect(async () => {
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -26.352856,
        userLongitude: -52.8656244,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
