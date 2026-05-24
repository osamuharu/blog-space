import { Module } from '@nestjs/common';
import { UserService } from './application/services/users.service';
import { UserDocumentPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UserController } from './presentation/controllers/user.controller';
import { CreateUserUseCase } from './application/useCases/create-user-use-case';
import { UserMapper } from './application/mappers/user.mapper';
import { UserMapperImpl } from './application/mappers/impl/user-impl.mapper';

@Module({
  imports: [
    // import modules, etc.
    UserDocumentPersistenceModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserUseCase,
    {
      provide: UserMapper,
      useClass: UserMapperImpl,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
