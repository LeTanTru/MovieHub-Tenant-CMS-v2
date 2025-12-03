import { apiConfig, queryKeys } from '@/constants';
import {
  ApiResponse,
  CommentPinBodyType,
  CommentVoteBodyType,
  CommentVoteResType
} from '@/types';
import { http } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useVoteListCommentQuery = ({ movieId }: { movieId: string }) => {
  return useQuery({
    queryKey: [`vote-${queryKeys.COMMENT}`, movieId],
    queryFn: () =>
      http.get<ApiResponse<CommentVoteResType[]>>(apiConfig.comment.voteList, {
        pathParams: {
          movieId
        }
      }),
    enabled: !!movieId
  });
};

export const useVoteCommentMutation = () => {
  return useMutation({
    mutationKey: [`vote-${queryKeys.COMMENT}`],
    mutationFn: (body: CommentVoteBodyType) =>
      http.put(apiConfig.comment.vote, {
        body
      })
  });
};

export const usePinCommentMutation = () => {
  return useMutation({
    mutationKey: [`pin-${queryKeys.COMMENT}`],
    mutationFn: (body: CommentPinBodyType) =>
      http.put(apiConfig.comment.pin, {
        body
      })
  });
};
