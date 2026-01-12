import { SidebarLayout } from '@/components/layout';
import { ReactNode } from 'react';

export default function AudienceLayout({ children }: { children: ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
