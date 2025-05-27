import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Answer, AnswerProps } from 'src/domain/forum/enterprise/entities/answer';
import { PrismaAnswerMapper } from 'src/infra/database/prisma/prisma-answer-mapper';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export function makeAnswer(
  override?: Partial<AnswerProps>,
  id?: UniqueEntityID
) {
  const question = Answer.create({
    questionId: new UniqueEntityID(),
    authorId: new UniqueEntityID(),
    content: faker.lorem.text(),
    ...override
  },
    id
  )

  return question
}

@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const answer = makeAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })

    return answer
  }
}