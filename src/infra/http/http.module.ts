import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionController } from "./controllers/fetch-recent-question.controller";
import { DatabaseModule } from "../database/database.module";
import { CreateQuestionUseCase } from "src/domain/forum/application/use-cases/create-question";
import { FetchRecentQuestionsUseCase } from "src/domain/forum/application/use-cases/fetch-recent-questions";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { RegisterStudentUseCase } from "src/domain/forum/application/use-cases/register-student";
import { AuthenticateStudentUseCase } from "src/domain/forum/application/use-cases/authenticate-student";
import { GetQuestionBySlugUseCase } from "src/domain/forum/application/use-cases/get-question-by-slug";
import { GetQuestionBySlugController } from "./controllers/get-question-by-slug.controller";
import { EditQuestionController } from "./controllers/edit-question.controller";
import { EditQuestionUseCase } from "src/domain/forum/application/use-cases/edit-question";
import { DeleteQuestionController } from "./controllers/delete-question.controller";
import { DeleteQuestionUseCase } from "src/domain/forum/application/use-cases/delete-question";
import { AnswerQuestionController } from "./controllers/answer-question.controller";
import { AnswerQuestionUseCase } from "src/domain/forum/application/use-cases/answer-question";
import { EditAnswerController } from "./controllers/edit-answer.controller";
import { EditAnswerUseCase } from "src/domain/forum/application/use-cases/edit-answer";
import { DeleteAnswerController } from "./controllers/delete-answer.controller.e2e-spec";
import { DeleteAnswerUseCase } from "src/domain/forum/application/use-cases/delete-answer";
import { ChooseQuestionBestAnswerUseCase } from "src/domain/forum/application/use-cases/chose-question-best-answer";
import { ChooseQuestionBestAnswerController } from "./controllers/choose-question-best-answer.controller";
import { CommentOnQuestionController } from "./controllers/comment-on-question.controller";
import { CommentOnQuestionUseCase } from "src/domain/forum/application/use-cases/comment-on-question";

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase
  ],
})

export class HttpModule { }