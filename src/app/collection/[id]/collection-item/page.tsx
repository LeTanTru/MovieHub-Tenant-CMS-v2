import { CollectionItemList } from '@/app/collection/[id]/collection-item/_components';
import { queryKeys } from '@/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chi tiết bộ sưu tập'
};

export default function CollectionItemListPage() {
  return <CollectionItemList queryKey={queryKeys.COLLECTION_ITEM} />;
}
