import { AppVersionList } from '@/app/app-version/_components';
import { queryKeys } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phiên bản ứng dụng'
};

export default function AppVersionListPage() {
  return <AppVersionList queryKey={queryKeys.APP_VERSION} />;
}
