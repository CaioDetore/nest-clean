import { Either, right } from "src/core/either"
import { QuestionCommentsRepository } from "../repositories/question-comments-repository"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { Injectable } from "@nestjs/common"
import { CommentWithAuthor } from "../../enterprise/entities/value-objects/comment-with-author"

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) { }

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    return right({
      comments,
    })
  }
}