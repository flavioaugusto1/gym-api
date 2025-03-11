import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from 'src/repositories/check-ins-repository'

interface FetchUserCheckInsHitoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHitoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHitoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHitoryRequest): Promise<FetchUserCheckInsHitoryResponse> {
    const checkIns = await this.checkInsRepository.findManyUserCheckIns(
      userId,
      page,
    )

    return { checkIns }
  }
}
