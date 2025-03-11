import { Gym } from '@prisma/client'

import { GymsRepository } from 'src/repositories/gyms-respositories'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLogintude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gym: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLogintude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gym = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLogintude,
    })

    return {
      gym,
    }
  }
}
