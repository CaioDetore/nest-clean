import { Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/infra/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/infra/http/pipes/zod-validation.pipe";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { z } from "zod";
import { FetchRecentQuestionsUseCase } from "src/domain/forum/application/use-cases/fetch-recent-questions";

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(
  z.number().min(1)
)

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) { }

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema
  ) {
    const perPage = 20

    const questions = await this.fetchRecentQuestions.execute({
      page,
    })

    return {
      questions
    }
  }
}
