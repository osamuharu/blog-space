import { Transform, TransformFnParams } from 'class-transformer';
import { Types } from 'mongoose';

export class BaseDocumentEntity {
  @Transform(
    ({ value, obj, key }: TransformFnParams): string => {
      const record = obj as Record<string, unknown>;
      const raw: unknown = record[key] ?? value;

      if (raw instanceof Types.ObjectId) {
        return raw.toHexString();
      }

      if (typeof raw === 'object' && raw !== null && 'toHexString' in raw) {
        return (raw as Types.ObjectId).toHexString();
      }

      return String(raw);
    },
    { toClassOnly: true },
  )
  public _id!: string;

  public __v!: number;
}
