import { TransformFnParams } from 'class-transformer/types/interfaces';
import { MaybeType } from '../types/maybe.type';

export const lowerCaseTransformer = (
  params: TransformFnParams,
): MaybeType<string> => {
  const value: unknown = params.value;

  if (typeof value === 'string') {
    return value.toLowerCase().trim();
  }

  return value as MaybeType<string>;
};
