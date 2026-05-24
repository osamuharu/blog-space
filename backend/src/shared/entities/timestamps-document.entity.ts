import { Prop } from '@nestjs/mongoose';
import { now } from 'mongoose';
import { BaseDocumentEntity } from './base-document.entity';

export class TimestampsDocumentEntity extends BaseDocumentEntity {
  @Prop({ type: Date, default: now })
  createdAt: Date;

  @Prop({ type: Date, default: now })
  updatedAt: Date;

  @Prop({ type: Date })
  deletedAt?: Date;
}
