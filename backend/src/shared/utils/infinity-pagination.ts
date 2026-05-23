import { IPaginationOptions } from '../types/pagination-options';
import { InfinityPaginationResponseDto } from '../dtos/infinity-pagination-response.dto';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
): InfinityPaginationResponseDto<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};
