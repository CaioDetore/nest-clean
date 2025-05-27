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
    DeleteQuestionController
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase
  ],
})

export class HttpModule { }