import { Gym } from '@prisma/client'

import { GymsRepository } from 'src/repositories/gyms-respositories'

interface SearchGymsUseCaseRequest {
  title: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gym: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gym = await this.gymsRepository.searchMany(title, page)

    return {
      gym,
    }
  }
}
