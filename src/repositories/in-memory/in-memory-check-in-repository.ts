import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInsRepository {
  item: CheckIn[] = []

  async findManyUserCheckIns(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = this.item
      .filter((checkIn) => {
        return checkIn.user_id === userId
      })
      .slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.item.find((checkIn) => {
      const checkinDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkinDate.isAfter(startOfTheDay) && checkinDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async findById(id: string) {
    const checkIn = this.item.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async countByUserId(userId: string): Promise<number> {
    return this.item.filter((checkIn) => {
      return checkIn.user_id === userId
    }).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.item.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.item.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.item[checkInIndex] = checkIn
    }

    return checkIn
  }
}
