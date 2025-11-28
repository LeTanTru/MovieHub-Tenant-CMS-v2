import { apiConfig, queryKeys } from '@/constants';
import { ApiResponseList, CollectionItemResType } from '@/types';
import { http } from '@/utils';
import { useQuery } from '@tanstack/react-query';

export const useCollectionItemListQuery = () => {
  return useQuery({
    queryKey: [`${queryKeys.COLLECTION_ITEM}-list`],
    queryFn: () =>
      http.get<ApiResponseList<CollectionItemResType>>(
        apiConfig.collectionItem.getList
      )
  });
};
