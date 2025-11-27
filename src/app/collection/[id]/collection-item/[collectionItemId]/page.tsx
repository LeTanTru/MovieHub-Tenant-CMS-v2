import { CollectionItemForm } from '@/app/collection/[id]/collection-item/_components';
import { queryKeys } from '@/constants';

export default function CollectionItemSavePage() {
  return <CollectionItemForm queryKey={queryKeys.COLLECTION_ITEM} />;
}
