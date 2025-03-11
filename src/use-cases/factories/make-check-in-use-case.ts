import { PrismaGymsRepository } from 'src/repositories/prisma/prisma-gyms.repository'
import { CheckInUseCase } from '../check-in'
import { PrismaCheckinRepository } from 'src/repositories/prisma/prisma-check-in-repository'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckinRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInRepository, gymsRepository)

  return useCase
}
