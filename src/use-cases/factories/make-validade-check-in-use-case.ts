import { PrismaCheckinRepository } from 'src/repositories/prisma/prisma-check-in-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckinRepository()
  const useCase = new ValidateCheckInUseCase(checkInRepository)

  return useCase
}
