import { Transform, TransformFnParams } from 'class-transformer';

interface Stringifiable {
  toString(): string;
}

export function DocumentObjectIdTransformer() {
  // https://github.com/typestack/class-transformer/issues/879
  return Transform(
    (params: TransformFnParams) => {
      if ('value' in params) {
        const obj = params.obj as Record<string, unknown>;
        const rawValue = obj[params.key] as Stringifiable | undefined | null;

        if (rawValue && typeof rawValue.toString === 'function') {
          return rawValue.toString();
        }
      }
      return 'unknown value';
    },
    { toPlainOnly: true },
  );
}
