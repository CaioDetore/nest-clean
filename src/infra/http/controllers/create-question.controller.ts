import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/infra/auth/jwt-auth.guard";
import { UserPayload } from "src/infra/auth/jwt.strategy";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation.pipe";

import { z } from 'zod'
import { CurrentUser } from "src/infra/auth/current-user-decorator";
import { CreateQuestionUseCase } from "src/domain/forum/application/use-cases/create-question";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/question')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload) {
    const { content, title } = body

    const { sub: userId } = user

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    })
  }
}
