import { TimestampsDocumentEntity } from '@/src/shared/entities/timestamps-document.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserSchemaClass extends TimestampsDocumentEntity {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true, unique: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);
export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;
