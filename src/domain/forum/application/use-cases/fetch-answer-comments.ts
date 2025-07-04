import { Either, right } from "src/core/either"
import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { Injectable } from "@nestjs/common"
import { CommentWithAuthor } from "../../enterprise/entities/value-objects/comment-with-author"

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const comments =
      await this.answerCommentsRepository.findManyByAnswerIdWithAuthor(
        answerId,
        {
          page,
        },
      )

    return right({
      comments,
    })
  }
}