import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaClass } from './schemas/users.schema';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserDocumentRepository } from './repositories/user.repository';

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
  ],
  exports: [UserRepository],
})
export class UserDocumentPersistenceModule {}
