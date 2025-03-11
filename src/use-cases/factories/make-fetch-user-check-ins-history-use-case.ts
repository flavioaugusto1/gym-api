import { FetchUserCheckInsHitoryUseCase } from '../fetch-user-history-check-ins'
import { PrismaCheckinRepository } from 'src/repositories/prisma/prisma-check-in-repository'

export function makeFetchUserCheckInsHistory() {
  const checkInRepository = new PrismaCheckinRepository()
  const useCase = new FetchUserCheckInsHitoryUseCase(checkInRepository)

  return useCase
}
