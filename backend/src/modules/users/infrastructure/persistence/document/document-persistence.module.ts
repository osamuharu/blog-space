import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaClass } from './schemas/users.schema';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserDocumentRepository } from './repositories/user.repository';
import { UserPersistenceMapper } from './mappers/user-persistence.mapper';
import { UserPersistenceImpl } from './mappers/impl/user-persistence.impl';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserDocumentRepository,
    },
    {
      provide: UserPersistenceMapper,
      useClass: UserPersistenceImpl,
    },
  ],
  exports: [UserRepository],
})
export class UserDocumentPersistenceModule {}
