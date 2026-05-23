import { Prop } from '@nestjs/mongoose';
import { now } from 'mongoose';

export class TimestampsDocumentEntity {
  @Prop({ type: Date, default: now })
  createdAt: Date;

  @Prop({ type: Date, default: now })
  updatedAt: Date;

  @Prop({ type: Date })
  deletedAt?: Date;
}
