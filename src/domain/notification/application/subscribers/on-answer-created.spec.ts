import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest"
import { OnAnswerCreated } from "./on-answer-created"
import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "../use-cases/send-notification"
import { InMemoryNotificationRepository } from "test/repositories/in-memory-notifcation-repository"
import { makeQuestion } from "test/factories/make-question"
import { waitFor } from "test/utils/wait-for"
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository"
import { InMemoryAttachmentsRepository } from "test/repositories/in-memory-attachments-repository"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let sendNotificationExecuteSpy: MockInstance<
  ({
    ...args
  }: SendNotificationUseCaseRequest) => Promise<SendNotificationUseCaseResponse>
>


describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should  send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})