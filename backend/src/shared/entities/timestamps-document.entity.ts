import { Prop } from '@nestjs/mongoose';

export class TimestampsDocumentEntity {
  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  deletedAt?: Date;
}
