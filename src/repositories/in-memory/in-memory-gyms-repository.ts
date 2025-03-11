import { Gym, Prisma } from '@prisma/client'
import { findManyNearbyGymsParams, GymsRepository } from '../gyms-respositories'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from 'src/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  item: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.item.push(gym)

    return gym
  }

  async findManyNearby(params: findManyNearbyGymsParams): Promise<Gym[]> {
    return this.item.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async searchMany(title: string, page: number): Promise<Gym[]> {
    return this.item
      .filter((checkIn) => checkIn.title.includes(title))
      .slice((page - 1) * 20, page * 20)
  }

  async findGymById(gymId: string) {
    const gym = this.item.find((item) => item.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}
