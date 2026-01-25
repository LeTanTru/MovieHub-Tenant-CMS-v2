import { GroupList } from '@/app/group-permission/_components';
import { queryKeys } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quyền'
};

export default function GroupListPage() {
  return <GroupList queryKey={queryKeys.GROUP} />;
}
