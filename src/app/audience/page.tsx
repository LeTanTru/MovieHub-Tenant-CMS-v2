import { AudienceList } from '@/app/audience/_components';
import { queryKeys } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khán giả'
};

export default function AudienceListPage() {
  return <AudienceList queryKey={queryKeys.AUDIENCE} />;
}
