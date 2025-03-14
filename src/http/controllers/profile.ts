import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileUseCase } from 'src/use-cases/factories/make-get-user-profile-use-case'

export async function profile(request: FastifyRequest, response: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return response.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
