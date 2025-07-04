import { Either, right } from "src/core/either";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { Injectable } from "@nestjs/common";

export interface SendNotificationUseCaseRequest {
  recipientId: string
  content: string
  title: string
}

export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) { }

  async execute({
    recipientId,
    content,
    title,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      content,
      title
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
