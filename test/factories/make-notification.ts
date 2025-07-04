import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Slug } from "src/domain/forum/enterprise/entities/value-objects/slug";
import { Notification, NotificationProps } from 'src/domain/notification/enterprise/entities/notification';
import { PrismaNotificationMapper } from 'src/infra/database/prisma/mappers/prisma-notification-mapper';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

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

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNotification(
    data: Partial<NotificationProps> = {},
  ): Promise<Notification> {
    const notification = makeNotification(data)

    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    })

    return notification
  }
}