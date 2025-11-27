import { CollectionForm } from '@/app/collection/_components';
import { queryKeys } from '@/constants';

export default function CollectionSavePage() {
  return <CollectionForm queryKey={queryKeys.COLLECTION} />;
}
