import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from 'src/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from 'src/use-cases/factories/make-authenticate-use-case'
import z from 'zod'

export async function authenticate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { password, email } = requestBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ password, email })

    const token = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return response.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return response.status(409).send()
    }

    return response.status(500).send()
  }
}
