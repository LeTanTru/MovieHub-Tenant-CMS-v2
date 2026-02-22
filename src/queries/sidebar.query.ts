import { apiConfig, queryKeys } from '@/constants';
import { ApiResponse, MovieSidebarBodyType } from '@/types';
import { http } from '@/utils';
import { useMutation } from '@tanstack/react-query';

export const useChangeStatusSidebarMutation = () => {
  return useMutation({
    mutationKey: [queryKeys.SIDEBAR],
    mutationFn: (body: MovieSidebarBodyType & { id: string }) =>
      http.post<ApiResponse<any>>(apiConfig.sidebar.update, {
        body
      })
  });
};
