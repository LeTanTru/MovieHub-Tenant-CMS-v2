import { apiConfig, MAX_PAGE_SIZE, queryKeys } from '@/constants';
import { ApiResponse, ApiResponseList, MovieItemResType } from '@/types';
import { http } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useMovieItemListQuery = ({ movieId }: { movieId: string }) => {
  return useQuery({
    queryKey: [`${queryKeys.MOVIE_ITEM}-list`],
    queryFn: () =>
      http.get<ApiResponseList<MovieItemResType>>(apiConfig.movieItem.getList, {
        params: {
          size: MAX_PAGE_SIZE,
          movieId
        }
      })
  });
};

export const useUpdateOrderingMovieItemMutation = () => {
  return useMutation({
    mutationKey: [`update-ordering-${queryKeys.MOVIE_ITEM}`],
    mutationFn: (body: { id: string; ordering: number }[]) =>
      http.post<ApiResponse<any>>(apiConfig.movieItem.updateOrdering, {
        body
      })
  });
};
