import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { QuestionsRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from 'src/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { AnswerCommentsRepository } from 'src/domain/forum/application/repositories/answer-comments-repository'
import { AnswerAttachmentsRepository } from 'src/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerRepository } from 'src/domain/forum/application/repositories/answers-repository'
import { QuestionAttachmentsRepository } from 'src/domain/forum/application/repositories/question-attachments-repository'
import { QuestionCommentsRepository } from 'src/domain/forum/application/repositories/question-comments-repository'
import { AttachmentsRepository } from 'src/domain/forum/application/repositories/attachments-repository'
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionsCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswerRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswerRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
    AttachmentsRepository
  ],
})
export class DatabaseModule { }
