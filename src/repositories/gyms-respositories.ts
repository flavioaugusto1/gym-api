import { Gym, Prisma } from '@prisma/client'

export interface findManyNearbyGymsParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findGymById(gymId: string): Promise<Gym | null>
  searchMany(title: string, page: number): Promise<Gym[]>
  findManyNearby(params: findManyNearbyGymsParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
