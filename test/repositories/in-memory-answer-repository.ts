import { DomainEvents } from "src/core/events/domain-events";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { AnswerAttachmentsRepository } from "src/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerRepository } from "src/domain/forum/application/repositories/answers-repository";
import { Answer } from "src/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}


  async findManyByQuestionId(questionId: string, {page}: PaginationParams): Promise<Answer[]> {
    const answers = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === answer.id)

    this.items.splice(itemIndex, 1)
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }

  async create(answer: Answer) {
    this.items.push(answer)

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === answer.id)

    this.items[itemIndex] = answer

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getNewItems(),
    )

    await this.answerAttachmentsRepository.deleteMany(
      answer.attachments.getRemovedItems(),
    )
    
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }
}