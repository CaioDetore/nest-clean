import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";

import { z } from 'zod'
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { ZodValidationPipe } from "../pipes/zod-validation.pipe";
import { AuthenticateStudentUseCase } from "src/domain/forum/application/use-cases/authenticate-student";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})

type authenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: authenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value

    return {
      acess_token: accessToken
    }
  }

}