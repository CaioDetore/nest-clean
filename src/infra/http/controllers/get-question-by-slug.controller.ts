import { BadRequestException, Controller, Get, Param } from "@nestjs/common"
import { GetQuestionBySlugUseCase } from "src/domain/forum/application/use-cases/get-question-by-slug"
import { QuestionPresenter } from "../presenters/question-presenter"
import { QuestionDetailsPresenter } from "../presenters/question-details-presenter"

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuestionDetailsPresenter.toHTTP(result.value.question) }
  }
}