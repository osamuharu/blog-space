import { Module } from '@nestjs/common';
import { UserService } from './application/services/users.service';
import { UserDocumentPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UserController } from './presentation/controllers/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';

@Module({
  imports: [
    // import modules, etc.
    UserDocumentPersistenceModule,
  ],
  controllers: [UserController],
  providers: [UserService, CreateUserUseCase],
  exports: [UserService],
})
export class UserModule {}
