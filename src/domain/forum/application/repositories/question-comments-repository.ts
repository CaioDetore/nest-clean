import { PaginationParams } from "src/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { CommentWithAuthor } from "../../enterprise/entities/value-objects/comment-with-author";

export abstract class QuestionCommentsRepository {
  abstract findById(id: string): Promise<QuestionComment | null>
  
  abstract create(questionComment: QuestionComment): Promise<void>
  
  abstract delete(questionComment: QuestionComment): Promise<void>
  
  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
}