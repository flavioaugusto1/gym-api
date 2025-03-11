import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckinRepository } from 'src/repositories/prisma/prisma-check-in-repository'

export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrismaCheckinRepository()
  const useCase = new GetUserMetricsUseCase(checkInRepository)

  return useCase
}
