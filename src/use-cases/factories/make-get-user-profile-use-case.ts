import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repositories'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(prismaUsersRepository)

  return useCase
}
