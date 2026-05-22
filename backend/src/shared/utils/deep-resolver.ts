import { DeepResolved } from '../types/deep-resolved.type';

async function deepResolvePromises<T>(input: T): Promise<DeepResolved<T>> {
  if (input instanceof Promise) {
    const resolved = await input;
    return deepResolvePromises(resolved) as Promise<DeepResolved<T>>;
  }

  if (Array.isArray(input)) {
    const resolvedArray = await Promise.all(
      input.map((item) => deepResolvePromises(item)),
    );
    return resolvedArray as unknown as DeepResolved<T>;
  }

  if (input instanceof Date) {
    return input as unknown as DeepResolved<T>;
  }

  if (typeof input === 'object' && input !== null) {
    const keys = Object.keys(input) as Array<keyof T>;

    const resolvedObject = {} as { [K in keyof T]: DeepResolved<T[K]> };

    for (const key of keys) {
      resolvedObject[key] = await deepResolvePromises(input[key]);
    }

    return resolvedObject as unknown as DeepResolved<T>;
  }

  return input as unknown as DeepResolved<T>;
}

export default deepResolvePromises;
