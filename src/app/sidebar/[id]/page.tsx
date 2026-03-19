import { SidebarForm } from '@/app/sidebar/_components';
import { queryKeys } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phim hot'
};

export default function SidebarSavePage() {
  return <SidebarForm queryKey={queryKeys.SIDEBAR} />;
}
