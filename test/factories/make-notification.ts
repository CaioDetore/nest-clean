import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Slug } from "src/domain/forum/enterprise/entities/value-objects/slug";
import { Notification, NotificationProps } from 'src/domain/notification/enterprise/entities/notification';

export function makeNotification(
  override?: Partial<NotificationProps>,
  id?: UniqueEntityID
) {
  const notification = Notification.create({
    title: faker.lorem.sentence(),
    recipientId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override
  },
    id
  )

  return notification
}