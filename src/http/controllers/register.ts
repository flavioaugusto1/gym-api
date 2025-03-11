import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExists } from 'src/errors/user-already-exists-error'
import { makeRegisterUseCase } from 'src/use-cases/factories/make-register-use-case'
import z from 'zod'

export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, password, email } = requestBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    registerUseCase.execute({ name, password, email })
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return response.status(409).send()
    }

    return response.status(500).send()
  }

  return response.status(201).send()
}
